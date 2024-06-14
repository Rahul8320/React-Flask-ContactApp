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
import { EnqueueSnackbar } from "notistack";

class ContactService {
  async getAllContact(dispatch: Dispatch): Promise<void> {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
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
    dispatch: Dispatch,
    enqueueSnackbar: EnqueueSnackbar
  ): Promise<void> {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

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
        enqueueSnackbar("Contact created successfully", {
          variant: "success",
        });
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
    dispatch: Dispatch,
    enqueueSnackbar: EnqueueSnackbar
  ): Promise<void> {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

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
        enqueueSnackbar("Contact updated successfully", { variant: "success" });
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

  async deleteContact(
    contactId: number,
    dispatch: Dispatch,
    enqueueSnackbar: EnqueueSnackbar
  ): Promise<void> {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const options = {
        method: "DELETE",
      };

      const response = await fetch(
        `${apiConfig.BaseUrl}/delete-contact/${contactId}`,
        options
      );
      const { message } = await response.json();

      if (response.status === 200) {
        this.getAllContact(dispatch);
        enqueueSnackbar("Contact deleted successfully", { variant: "success" });
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
