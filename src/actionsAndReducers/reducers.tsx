import { combineReducers } from "redux";
import { SelectContactAction } from "./actions";
export const ADD_CONTACT = "ADD_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
const READ_CONTACTS = "READ_CONTACTS";
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
export const SELECT_CONTACT = "SELECT_CONTACT";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ContactsState {
  contacts: Contact[];
  isModalOpen: boolean;
  selectedContact: Contact | undefined;
}

export interface ReadContactsAction {
  type: typeof READ_CONTACTS;
  payload: Contact[];
}

interface AddContactAction {
  type: typeof ADD_CONTACT;
  payload: Contact;
}

interface UpdateContactAction {
  type: typeof UPDATE_CONTACT;
  payload: Contact;
}

interface DeleteContactAction {
  type: typeof DELETE_CONTACT;
  payload: string;
}

interface OpenModalAction {
  type: "OPEN_MODAL";
}

interface CloseModalAction {
  type: "CLOSE_MODAL";
}

type ContactsAction =
  | SelectContactAction
  | ReadContactsAction
  | AddContactAction
  | UpdateContactAction
  | DeleteContactAction
  | OpenModalAction
  | CloseModalAction;

const initialState: ContactsState = {
  contacts: [],

  // {
  //   id: 3,
  //   name: "Mark Zuckerberg",
  //   email: "mark@gmail.com",
  //   phone: "0212-8721259",
  // },

  isModalOpen: false,
  selectedContact: undefined,
};

const contactsReducer = (
  state: ContactsState = initialState,
  action: ContactsAction
): ContactsState => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };

    case READ_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case SELECT_CONTACT:
      return {
        ...state,
        selectedContact: action.payload,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

export default rootReducer;
