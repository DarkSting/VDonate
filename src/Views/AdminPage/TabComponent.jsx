import React from "react";
import { Typography, Box } from "@mui/material";
import daker from "../../CommonComponents/ColorDarker";
import { Stack } from "react-bootstrap";

export default function Tab({
  title,
  titleBackColor,
  fontColor,
  fontSize,
  renderContent,
}) {
  const lightColor = daker(titleBackColor, 0, 77);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: lightColor,
            borderBottom: "3px solid " + titleBackColor,
            width: "100%",
          }}
        >
          <Typography
            variant={fontSize}
            sx={{ padding: "10px", color: fontColor }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          {renderContent}
        </Box>
      </Box>
    </>
  );
}
