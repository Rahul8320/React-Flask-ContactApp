import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../models/contact";

export interface ContactState {
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
}

const initialState: ContactState = {
  contacts: [],
  isLoading: false,
  error: null,
  isModalOpen: false,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContact: (state, action: { payload: Contact[] }) => {
      state.contacts = action.payload;
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: { payload: string }) => {
      state.error = action.payload;
    },
    setModalState: (state, action: { payload: boolean }) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setContact, setError, setLoading, setModalState } =
  contactSlice.actions;

export default contactSlice.reducer;
