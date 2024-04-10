import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        style={{ marginTop: 5, paddingLeft: 120, paddingRight: 120 }}
      >
        <Grid item xs={12} style={{ display: "flex", justifyContent: "start" }}>
          <Typography
            style={{
              color: "#848484",
              fontWeight: 600,
              fontSize: 24,
            }}
          >
            Contactos
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
