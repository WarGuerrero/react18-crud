import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import RootState from "../types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import { db } from "../index";
import {
  collection,
  query,
  where,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { openModal, setSelectedContact } from "../actionsAndReducers/actions";
import { DELETE_CONTACT } from "../actionsAndReducers/reducers";
import { Contact } from "../actionsAndReducers/reducers";

export default function ContactTable() {
  const dispatch = useDispatch();

  const rows = useSelector((state: RootState) => state.contacts.contacts);

  const handleUpdateContact = (contact: Contact) => {
    dispatch(setSelectedContact(contact));
    dispatch(openModal());
  };

  const deleteContact = async (contactId: string) => {
    try {
      let ID: string;
      const q = query(
        collection(db, "ContactosV"),
        where("id", "==", contactId)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const documentSnapshot = querySnapshot.docs[0];
        ID = documentSnapshot.id;

        await deleteDoc(doc(db, "ContactosV", ID));
        dispatch({
          type: DELETE_CONTACT,
          payload: contactId,
        });
        console.log("Contacto eliminado exitosamente de Firestore. ID:", ID);
      } else {
        console.log(
          "No se encontró ningún documento con la propiedad ID y el valor",
          contactId
        );
      }
    } catch (error) {
      console.error("Error al eliminar el contacto de Firestore:", error);
    }
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow
            style={{ width: "100%" }}
            sx={{
              backgroundColor: "#FAFAFA",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <TableCell
              style={{
                color: "#3F3F3F",
                fontWeight: 400,
                fontSize: 12,
                fontFamily: "Noto Sans",
                width: "61%",
              }}
            >
              Beneficiario
            </TableCell>
            <TableCell
              style={{
                width: "15%",
                color: "#3F3F3F",
                fontWeight: 400,
                fontSize: 12,
                fontFamily: "Noto Sans",
              }}
              align="center"
            >
              Correo
            </TableCell>
            <TableCell
              style={{
                width: "15%",
                color: "#3F3F3F",
                fontWeight: 400,
                fontSize: 12,
                fontFamily: "Noto Sans",
              }}
              align="center"
            >
              Telefono
            </TableCell>
            <TableCell
              style={{
                width: "16%",
                color: "#3F3F3F",
                fontWeight: 400,
                fontSize: 12,
                fontFamily: "Noto Sans",
                paddingRight: 30,
              }}
              align="center"
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{
                backgroundColor: index % 2 === 0 ? "transparent" : "#FAFAFA",
                borderRadius: "10px",
                overflow: "hidden",
              }}
              style={{ borderBottom: "none" }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{
                  color: "#3F3F3F",
                  fontWeight: 400,
                  fontSize: 12,
                  fontFamily: "Noto Sans",
                }}
              >
                {row.name}
              </TableCell>

              <TableCell
                component="th"
                scope="row"
                align="center"
                style={{
                  color: "#3F3F3F",
                  fontWeight: 400,
                  fontSize: 12,
                  fontFamily: "Noto Sans",
                }}
              >
                {row.email}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                align="center"
                style={{
                  color: "#3F3F3F",
                  fontWeight: 400,
                  fontSize: 12,
                  fontFamily: "Noto Sans",
                }}
              >
                {row.phone}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                align="center"
                style={{
                  display: "flex",
                }}
              >
                <Button
                  variant="text"
                  style={{
                    textTransform: "none",
                    color: "#1A53AD",
                    fontWeight: 700,
                    fontSize: 12,
                    fontFamily: "Noto Sans",
                  }}
                  onClick={() => handleUpdateContact(row)}
                >
                  Editar
                </Button>
                <Button
                  variant="text"
                  style={{
                    textTransform: "none",
                    color: "#C60000",
                    fontWeight: 700,
                    fontSize: 12,
                    fontFamily: "Noto Sans",
                  }}
                  onClick={() => deleteContact(row.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
