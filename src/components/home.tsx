import * as React from "react";
import { useSelector } from "react-redux";

import { useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import RootState from "../types";
import ContactTable from "./contactTable";
import Empty from "./empty";
import CreateContact from "./modals/createContact";
import { openModal, readContacts } from "../actionsAndReducers/actions";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  const rows = useSelector((state: RootState) => state.contacts.contacts);

  const fetchData = async () => {
    try {
      const firestore = getFirestore();
      const collectionRef = collection(firestore, "ContactosV");
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map((doc) => {
        const { id, name, email, phone } = doc.data();
        return { id, name, email, phone };
      });

      dispatch(readContacts(data));
    } catch (error) {
      console.log("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 15,
          paddingLeft: 120,
          paddingRight: 120,
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Typography
            style={{
              color: "#585858",
              fontWeight: 600,
              fontSize: 24,
              marginBottom: 20,
              fontFamily: "Noto Sans",
            }}
          >
            Contactos
          </Typography>
          <Alert
            variant="filled"
            icon={false}
            style={{
              maxWidth: "fit-content",
              backgroundColor: "#DDEBFF",
              color: "#0052CC",
              fontFamily: "Noto Sans",
              fontWeight: 400,
              fontSize: 8,
              marginBottom: 60,
            }}
          >
            Informacion: En esta Seccion podra visualizar, Editar, Crear y
            Eliminar contactos
          </Alert>
        </Grid>

        {rows.length > 0 ? (
          <>
            <ContactTable />
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
                marginTop: 20,
              }}
              onClick={handleOpenModal}
            >
              Agregar Contactos
            </Button>
          </>
        ) : (
          <Empty />
        )}
      </Grid>

      <CreateContact />
    </Box>
  );
}
