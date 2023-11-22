import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Stack,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
//import CardExpansion from './CardExpansion';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Axios from "../../api/axios";
import { useSnackbar } from "../../CommonComponents/SnackBarContext";
import {
  ArrowDownward,
  ArrowDropDown,
  ArrowDropDownCircle,
  ArrowDropUp,
  ArrowUpward,
} from "@mui/icons-material";
import { LoadSubSpinner } from "../../CommonComponents/SpinFunction";

const CampaignCard = ({ campaign, setArray, setRemovedItem, currentArray }) => {
  const [expanded, setExpanded] = useState(false);
  const [cardId, setCardID] = useState(campaign._id);
  const [staff, setStaff] = useState([]);
  const [donors, setDonors] = useState([]);

  const { openSnackbar, closeSnackbar } = useSnackbar();

  const toggleExpansion = () => {
    if (!expanded) {
      Axios.get(`campaign/getstaffanddonorsexpand?campaignID=${cardId}`)
        .then((r) => {
          setStaff(r.data.staff);
          setDonors(r.data.donors);

          console.log(r.data.staff);
        })
        .catch((er) => {
          console.log(er);
          openSnackbar({
            message: `Cannot open`,
            color: "red",
          });
        });
    }

    setExpanded(!expanded);
  };

  function removeCard() {
    Axios.put("/campaign/cancellcampaign", { campaignID: cardId })
      .then((r) => {
        const newArray = currentArray.filter((item) => cardId !== item._id);
        setRemovedItem(cardId);
        setArray(newArray);
        openSnackbar({
          message: `${cardId} Campaign Cancelled`,
          color: "#000000",
        });
      })
      .catch((error) => {
        openSnackbar({
          message: `${cardId} Cannot Cancel the campaign`,
          color: "red",
        });
      });
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="body1">Location: {campaign.location}</Typography>
        <Typography variant="body1">
          Time Begin: {campaign.timeBegin}
        </Typography>
        <Typography variant="body1">Time End: {campaign.timeEnd}</Typography>
        <Typography variant="body1">
          Donors count: {campaign.donors.length}
        </Typography>
        <Typography variant="body1">
          Blood Container Capacity: {campaign.capacity}
        </Typography>
        <Box>
          {expanded && (
            <List>
              <h5>Staff:</h5>
              {staff.map((person, index) => (
                <ListItem key={index}>
                  <ListItemText primary={person.name} secondary={person.role} />
                </ListItem>
              ))}
              <h5>Donors:</h5>
              {donors.map((donor, index) => (
                <ListItem key={index}>
                  <ListItemText primary={donor.name} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={toggleExpansion}
          style={{ marginLeft: "auto" }}
          endIcon={!expanded ? <ArrowDownward /> : <ArrowUpward />}
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => {
            removeCard();
          }}
          style={{ marginLeft: "auto" }}
        >
          Cancell
        </Button>
      </CardActions>
    </Card>
  );
};

export default function PendingCampaignTab() {
  const [availablecampains, setAvailableCampaigns] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [removedItem, setRemovedItem] = useState("");

  const { openSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    Axios.get(
      `campaign/getpendingcampaigns?startTime=${startTime}&endTime=${endTime}`
    )
      .then((r) => {
        setAvailableCampaigns(r.data);
        openSnackbar({
          message: "Data Loaded",
          color: "green",
        });
        console.log(r.data);
      })
      .catch((error) => {
        openSnackbar({
          message: "Data Loading Failed",
          color: "red",
        });
      });
  }, [startTime, endTime, removedItem]);

  const [loading, setLoading] = useState(false);

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
          <Stack direction="row" spacing={2}>
            <DateTimePicker
              label="From Time"
              defaultValue={startTime}
              onChange={(newValue) => setStartTime(newValue)}
            />
            <DateTimePicker
              label="To Time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
            />
          </Stack>
        </DemoContainer>
      </LocalizationProvider>
      <Stack spacing={1} direction="column" sx={{ marginTop: "20px" }}>
        {availablecampains.length > 0
          ? availablecampains.map((value) => (
              <CampaignCard
                key={value._id}
                campaign={value}
                setArray={setAvailableCampaigns}
                setRemovedItem={setRemovedItem}
                currentArray={availablecampains}
              />
            ))
          : LoadSubSpinner(loading, setLoading, "No Pending Campaigns")}
      </Stack>
    </Box>
  );
}
