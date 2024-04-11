import { Contact } from "./reducers";

export const SELECT_CONTACT = "SELECT_CONTACT";
export const EDIT_CONTACT = "EDIT_CONTACT";

export const openModal = () => {
  return {
    type: "OPEN_MODAL",
  };
};

export const closeModal = () => {
  return {
    type: "CLOSE_MODAL",
  };
};

export interface ReadContactsAction {
  type: "READ_CONTACTS";
  payload: Contact[];
  [key: string]: any;
}

export interface SelectContactAction {
  type: "SELECT_CONTACT";
  payload: Contact | undefined;
}

export interface EditContactAction {
  type: typeof EDIT_CONTACT;
  payload: Contact;
}

export function readContacts(contacts: Contact[]): ReadContactsAction {
  return {
    type: "READ_CONTACTS",
    payload: contacts,
  };
}

export const setSelectedContact = (contact: Contact | undefined) => {
  return {
    type: "SELECT_CONTACT",
    payload: contact,
  };
};
