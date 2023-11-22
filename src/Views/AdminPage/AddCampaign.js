import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Autocomplete,
  Stack,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import Tab from "../../CommonComponents/TabComponent";
import { MyContext } from "../..";
import Axios from "../../api/axios";
import { useSnackbar } from "../../CommonComponents/SnackBarContext";
import { ArrowUpward, CircleOutlined } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  useJsApiLoader,
  Autocomplete as AutoText,
} from "@react-google-maps/api";
import { useRef } from "react";
import { LoadSubSpinner } from "../../CommonComponents/SpinFunction";

const libraries = ["places"];

function CardForm() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const { openSnackbar, closeSnackbar } = useSnackbar();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const { darkColor } = useContext(MyContext);
  const [staff, setStaff] = useState([
    {
      name: "test",
      role: "doctor",
    },
  ]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDKv4-KCDZuUgtvKNHq-DKKlFRiFhzpvdY",
    libraries: libraries,
  });

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  useEffect(() => {
    openSnackbar({
      message: "Loading",
      color: "#000000",
    });
    Axios.get("donation/getapprovedrequests")
      .then((r) => {
        //setAvailableItems(r.data.requestsArrays);
        let tempArray = [];
        r.data.requestsArrays.map((value) => {
          tempArray.push(value.User);
        });

        setAvailableItems(tempArray);
        openSnackbar({
          message: "Data Loaded",
          color: "green",
        });
      })
      .catch((error) => {
        openSnackbar({
          message: "Loading",
          color: "red",
        });
        console.log(error);
      });
  }, []);

  const handleSelectItem = (item) => {
    const newSelectedItems = [...selectedItems, item];
    const newAvailableItems = availableItems.filter((i) => i !== item);

    setSelectedItems(newSelectedItems);
    setAvailableItems(newAvailableItems);

    openSnackbar({
      message: "Donor Added",
      color: "green",
    });
  };

  useEffect(() => {
    Axios.get(
      `campaign/getstaffanddonors?startTime=${startTime}&endTime=${endTime}`
    )
      .then((r) => {
        //setAvailableItems(r.data.requestsArrays);
        let tempArray = [];

        console.log(r.data);

        setStaff(r.data.staff);

        openSnackbar({
          message: "Staff Loaded",
          color: "green",
        });
      })
      .catch((error) => {
        openSnackbar({
          message: "Loading Error",
          color: "red",
        });

        console.log(error);
      });
  }, [startTime, endTime]);

  const handleDeselectItem = (item) => {
    const newSelectedItems = selectedItems.filter((i) => i !== item);
    const newAvailableItems = [...availableItems, item];

    setSelectedItems(newSelectedItems);
    setAvailableItems(newAvailableItems);
  };

  const validateForm = () => {
    console.log(startTime);
    return (
      selectedStaff.length > 0 &&
      originRef !== null &&
      selectedItems.length > 0 &&
      startTime !== null &&
      endTime !== null
    );
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Handle form submission

      openSnackbar({
        message: "Creating Campaign...",
        color: "#000000",
      });

      let filteredArray = [];

      for (let current of selectedStaff) {
        filteredArray.push(current.id);
        console.log(filteredArray);
      }
      Axios.post("/campaign/addCampaign", {
        startTime: startTime,
        endTime: endTime,
        location: originRef.current.children[0].children[0].value,
        donors: selectedItems,
        staff: filteredArray,
      })
        .then((value) => {
          openSnackbar({
            message: "Campaign Created!",
            color: "green",
          });
        })
        .catch((e) => {
          openSnackbar({
            message: "Failed To Create Campaign",
            color: "red",
          });
          console.log(e);
        });
    } else {
      openSnackbar({
        message: "Please fill out all fields before submitting.",
        color: "red",
      });
    }
  };

  if (!isLoaded) {
    return LoadSubSpinner(isLoaded, () => {}, "Cannot Load Campaign Card");
  }

  return (
    <Card sx={{ width: "100%", flex: 1 }}>
      <CardContent>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Typography variant="body1">
              <b>Available Donors:</b>
            </Typography>
            <List>
              {availableItems.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleSelectItem(item)}
                  sx={{
                    backgroundColor: "#F1EFEF",
                    color: "black",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  <ListItemText primary={item.userName} />
                </ListItem>
              ))}
            </List>
          </div>
          <div style={{ flex: 1 }}>
            <Typography variant="body1">
              <b>To Be Added Donors:</b>
            </Typography>
            <List>
              {selectedItems.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleDeselectItem(item)}
                  sx={{
                    backgroundColor: darkColor,
                    color: "white",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  <ListItemText primary={item.userName} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
        <Stack spacing={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
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
            </DemoContainer>
          </LocalizationProvider>
          <AutoText>
            <TextField
              fullWidth
              type="text"
              placeholder="Enter Any Location"
              ref={originRef}
            />
          </AutoText>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={staff}
            getOptionLabel={(option) => option.name + " | " + option.role}
            filterSelectedOptions
            onChange={(event, selectedOptions) => {
              setSelectedStaff(selectedOptions);
              console.log(selectedOptions);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Staff Details"
                placeholder="Favorites"
              />
            )}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit();
              }}
              sx={{ width: "10%" }}
            >
              Save
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function CampaignTab() {
  const { darkColor } = useContext(MyContext);

  return <CardForm />;
}

export default CampaignTab;
