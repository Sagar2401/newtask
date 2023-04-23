import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import Contact from "../Model/Contact";
import { v4 as uuidv4 } from 'uuid';
type initialStateType = {
  contactList: Contact[];
};

const contactList: Contact[] = [
  {
    id: uuidv4(),
    firstName: "Roger ndutiye",
    lastName: "ndutiye",
    status: "Active",
  },
  {
    id: uuidv4(),
    firstName: "Stacy ndutiye",
    lastName: "ndutiye",
    status: "Active",
  },

];

const initialState: initialStateType = {
  contactList,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contactList.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const {
        payload: { id, firstName, lastName,status },
      } = action;

      state.contactList = state.contactList.map((contact) =>
        contact.id === id ? { ...contact, firstName, lastName,status} : contact
      );
    },
    removeContact: (state, action: PayloadAction<{ id: string }>) => {
      state.contactList = state.contactList.filter(
        (contact) => contact.id !== action.payload.id
      );
    },
  },
});

export const { addContact, updateContact, removeContact } =
  contactSlice.actions;
export const getContactList = (state: RootState) => state.contact.contactList;

export default contactSlice.reducer;
