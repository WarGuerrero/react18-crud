import { ContactsState } from "./actionsAndReducers/reducers";

interface RootState {
  contacts: ContactsState;
}

interface UnknownAction {
  [key: string]: any;
}

export default RootState;
