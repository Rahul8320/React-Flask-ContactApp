import { Dispatch } from "@reduxjs/toolkit";
import { apiConfig } from "../config/apiConfig";
import { AddContactModel } from "../models/contact";
import {
  setContact,
  setError,
  setLoading,
  setModalState,
} from "../stores/contactSlice";

class ContactService {
  async getAllContact(dispatch: Dispatch): Promise<void> {
    try {
      dispatch(setLoading(true));
      dispatch(setError(""));
      const response = await fetch(apiConfig.BaseUrl + "/contacts");

      if (response.status === 200) {
        const { contacts } = await response.json();
        dispatch(setContact(contacts));
      } else {
        dispatch(setError("Server Error!"));
      }
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async createNewContact(
    contact: AddContactModel,
    dispatch: Dispatch
  ): Promise<void> {
    try {
      dispatch(setLoading(true));
      dispatch(setError(""));

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      };

      const response = await fetch(
        `${apiConfig.BaseUrl}/create-contact`,
        options
      );
      const { message } = await response.json();

      if (response.status === 201) {
        this.getAllContact(dispatch);
        alert("Contact created successfully");
        dispatch(setModalState(false));
      } else if (response.status === 400 || response.status === 422) {
        dispatch(setError(message));
      } else {
        dispatch(setError("Server Error!"));
      }
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const contactService = new ContactService();
