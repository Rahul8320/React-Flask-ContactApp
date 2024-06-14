import { Dispatch } from "@reduxjs/toolkit";
import { apiConfig } from "../config/apiConfig";
import { AddOrUpdateContactModel } from "../models/contact";
import {
  setContacts,
  setError,
  setLoading,
  setModalState,
  setSelectedContact,
} from "../stores/contactSlice";

class ContactService {
  async getAllContact(dispatch: Dispatch): Promise<void> {
    try {
      dispatch(setLoading(true));
      dispatch(setError(""));
      const response = await fetch(apiConfig.BaseUrl + "/contacts");

      if (response.status === 200) {
        const { contacts } = await response.json();
        dispatch(setContacts(contacts));
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
    contact: AddOrUpdateContactModel,
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

  async updateContact(
    contact: AddOrUpdateContactModel,
    contactId: number,
    dispatch: Dispatch
  ): Promise<void> {
    try {
      dispatch(setLoading(true));
      dispatch(setError(""));

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      };

      const response = await fetch(
        `${apiConfig.BaseUrl}/update-contact/${contactId}`,
        options
      );
      const { message } = await response.json();

      if (response.status === 200) {
        this.getAllContact(dispatch);
        alert("Contact updated successfully");
        dispatch(setSelectedContact(null));
        dispatch(setModalState(false));
      } else if (response.status === 400) {
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
