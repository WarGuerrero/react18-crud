import * as React from "react";
import { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import RootState from "../../types";
import {
  closeModal,
  setSelectedContact,
} from "../../actionsAndReducers/actions";
import { ADD_CONTACT, UPDATE_CONTACT } from "../../actionsAndReducers/reducers";

import { useDispatch } from "react-redux";
import { db } from "../../index";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

import { nanoid } from "nanoid";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  Height: 460,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,
  borderRadius: 2,
};

export default function CreateContact() {
  const keyModal = useSelector(
    (state: RootState) => state.contacts.isModalOpen
  );
  const selectedContact = useSelector(
    (state: RootState) => state.contacts.selectedContact
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (selectedContact) {
      setName(selectedContact.name);
      setEmail(selectedContact.email);
      setPhone(selectedContact.phone);
    }
  }, [selectedContact]);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(setSelectedContact(undefined));
  };

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleCreateContact = async () => {
    const newContact = {
      id: nanoid(3),
      name: name,
      email: email,
      phone: phone,
    };

    try {
      const docRef = await addDoc(collection(db, "ContactosV"), newContact);
      dispatch({
        type: ADD_CONTACT,
        payload: newContact,
      });
      console.log("Contacto creado exitosamente en Firestore. ID:", docRef.id);
    } catch (error) {
      console.error("Error al crear el contacto en Firestore:", error);
    }
    setName("");
    setEmail("");
    setPhone("");
    dispatch(closeModal());
  };

  const handleUpdateContact = async () => {
    const updatedContact = {
      id: selectedContact?.id,
      name: name,
      email: email,
      phone: phone,
    };

    try {
      let ID: string;
      const q = query(
        collection(db, "ContactosV"),
        where("id", "==", selectedContact?.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const documentSnapshot = querySnapshot.docs[0];
        ID = documentSnapshot.id;

        const contactRef = doc(db, "ContactosV", ID);
        await updateDoc(contactRef, {
          name,
          email,
          phone,
        });
        dispatch({
          type: UPDATE_CONTACT,
          payload: updatedContact,
        });
        console.log(
          "Contacto actualizado exitosamente en Firestore. ID:",
          contactRef.id
        );
      } else {
        console.log(
          "No se encontró ningún documento con la propiedad ID y el valor",
          selectedContact?.id
        );
      }
    } catch (error) {
      console.error("Error al actualizar el contacto de Firestore:", error);
    }

    setName("");
    setEmail("");
    setPhone("");
    dispatch(closeModal());
  };

  return (
    <div>
      <Modal
        open={keyModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{
              color: "#585858",
              fontWeight: 600,
              fontSize: 24,
              marginBottom: 20,
              fontFamily: "Noto Sans",
            }}
          >
            {selectedContact ? "Editar Contacto" : "Agregar Contacto"}
          </Typography>

          <Typography
            style={{
              color: "#000",
              fontWeight: 400,
              fontSize: 12,
              marginBottom: 10,
              fontFamily: "Noto Sans",
            }}
          >
            Nombre
          </Typography>
          <TextField
            style={{ marginBottom: 15 }}
            variant="outlined"
            size="small"
            placeholder="Ingrese el nombre"
            fullWidth
            value={name}
            onChange={handleName}
          />
          <Typography
            style={{
              color: "#000",
              fontWeight: 400,
              fontSize: 12,
              marginBottom: 10,
              fontFamily: "Noto Sans",
            }}
          >
            Email
          </Typography>
          <TextField
            style={{ marginBottom: 15 }}
            variant="outlined"
            size="small"
            placeholder="Ingrese el email"
            fullWidth
            value={email}
            onChange={handleEmail}
          />
          <Typography
            style={{
              color: "#000",
              fontWeight: 400,
              fontSize: 12,
              marginBottom: 10,
              fontFamily: "Noto Sans",
            }}
          >
            Teléfono
          </Typography>
          <TextField
            style={{ marginBottom: 15 }}
            variant="outlined"
            size="small"
            placeholder="Ingrese el teléfono"
            fullWidth
            value={phone}
            onChange={handlePhone}
          />
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="text"
              style={{
                textTransform: "none",
                color: "#1A53AD",
                fontWeight: 400,
                fontSize: 12,
                fontFamily: "Noto Sans",
                borderRadius: 8,
                backgroundColor: "#DDEBFF",
                width: 161,
                height: 40,
                marginTop: 20,
              }}
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
            <Button
              variant="text"
              style={{
                textTransform: "none",
                color: "#DDEBFF",
                fontWeight: 400,
                fontSize: 12,
                fontFamily: "Noto Sans",
                borderRadius: 8,
                backgroundColor: "#1A53AD",
                width: 172,
                height: 40,
                marginTop: 20,
              }}
              onClick={
                selectedContact ? handleUpdateContact : handleCreateContact
              }
            >
              {selectedContact ? "Guardar" : "Agregar"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
