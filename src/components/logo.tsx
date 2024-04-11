import * as React from "react";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";
import logo from "../assets/logo.png";

function LogoBDVE() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 28,
        marginLeft: 2.5,
      }}
    >
      <img src={logo} alt="BDVE+" />
      <AddIcon fontSize="large" style={{ color: "white" }} />
    </Box>
  );
}

export default LogoBDVE;
