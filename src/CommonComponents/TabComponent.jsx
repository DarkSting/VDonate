import React from "react";
import { Typography, Box } from "@mui/material";
import daker from "./ColorDarker";

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
          alignSelf:'flex-start',
          marginTop:'10px'
        }}
      >
        <Box
          sx={{
            backgroundColor: lightColor,
            //borderBottom: "3px solid " + titleBackColor,
            width: "100%",borderRadius:'0px 30px',
          }}
        >
          <Typography
            variant={fontSize}
            sx={{ padding: "10px", color: fontColor, textAlign:'left', marginLeft:'30px' }}
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
