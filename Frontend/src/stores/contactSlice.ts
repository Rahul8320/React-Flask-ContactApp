import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../models/contact";

export interface ContactState {
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  selectedContact: Contact | null;
}

const initialState: ContactState = {
  contacts: [],
  isLoading: false,
  error: null,
  isModalOpen: false,
  selectedContact: null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContacts: (state, action: { payload: Contact[] }) => {
      state.contacts = action.payload;
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
    setModalState: (state, action: { payload: boolean }) => {
      state.isModalOpen = action.payload;
    },
    setSelectedContact: (state, action: { payload: Contact | null }) => {
      state.selectedContact = action.payload;
    },
  },
});

export const {
  setContacts,
  setError,
  setLoading,
  setModalState,
  setSelectedContact,
} = contactSlice.actions;

export default contactSlice.reducer;
