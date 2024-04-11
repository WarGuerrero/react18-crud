import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { openModal } from "../actionsAndReducers/actions";

import Logo from "./logo";

export default function Empty() {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <Grid
      container
      sx={{
        borderRadius: 2,
        backgroundColor: "#1A53AD",
        width: 497,
        height: 198,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        sx={{
          py: 4,
          width: "169px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo />
        <Typography
          textAlign="center"
          style={{
            textTransform: "none",
            color: "#FFFFFF",
            fontWeight: 400,
            fontSize: 12,
            fontFamily: "Noto Sans",
          }}
        >
          No posee contactos
        </Typography>
        <Button
          variant="text"
          style={{
            textTransform: "none",
            color: "#1A53AD",
            fontWeight: 400,
            fontSize: 12,
            fontFamily: "Noto Sans",
            borderRadius: 20,
            backgroundColor: "#FFF",
            width: 169,
            height: 40,
          }}
          onClick={handleOpenModal}
        >
          Agregar Contactos
        </Button>
      </Grid>
    </Grid>
  );
}
