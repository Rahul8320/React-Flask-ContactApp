import { AddOrUpdateContactModel } from "../models/contact";
import { contactService } from "../services/contactService";
import { useDispatch, useSelector } from "react-redux";
import {
  ContactState,
  setModalState,
  setSelectedContact,
} from "../stores/contactSlice";
import { RiCloseCircleLine } from "react-icons/ri";
import { useFormContext } from "react-hook-form";
import { Schema } from "../models/schema";
import { Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const ContactForm = () => {
  const [avatar, setAvatar] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const dispatch = useDispatch();
  const error = useSelector((state: ContactState) => state.error);
  const selectedContact = useSelector(
    (state: ContactState) => state.selectedContact
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useFormContext<Schema>();

  const onSubmitContact = async (data: AddOrUpdateContactModel) => {
    if (isEditing === true && selectedContact !== null) {
      await contactService.updateContact(data, selectedContact.id, dispatch);
    } else {
      await contactService.createNewContact(data, dispatch);
    }

    setTimeout(() => {
      reset();
    }, 2000);
  };

  const handleClose = () => {
    dispatch(setModalState(false));
    dispatch(setSelectedContact(null));
    reset();
  };

  useEffect(() => {
    if (selectedContact !== null) {
      setValue("avatar", selectedContact.avatar);
      setValue("email", selectedContact.email);
      setValue("firstName", selectedContact.firstName);
      setValue("lastName", selectedContact.lastName);
      setValue("phoneNumber", selectedContact.phoneNumber);

      setAvatar(selectedContact.avatar);
      setIsEditing(true);
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-slate-700">
          {isEditing ? "Update Contact" : "Add New Contact"}
        </h2>
        <RiCloseCircleLine
          className="h-10 w-6 text-gray-500 hover:text-gray-600 hover:cursor-pointer"
          onClick={handleClose}
        />
      </div>
      <div className="flex justify-center">
        {avatar && (
          <img
            src={avatar}
            alt="Profile Pic"
            className="w-24 h-24 rounded-full mb-3 border-2 border-slate-500"
          />
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmitContact)}>
        <Stack sx={{ gap: 2 }}>
          <TextField
            {...register("avatar")}
            label="Avatar"
            error={!!errors.avatar}
            helperText={errors.avatar?.message}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <TextField
            {...register("firstName")}
            label="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            {...register("lastName")}
            label="Last Name"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            {...register("phoneNumber")}
            label="Phone Number"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
          <TextField
            {...register("email")}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Stack>
        <button
          className="bg-sky-600 p-2 rounded-full my-2 text-white px-5 hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
          type="submit"
          disabled={!isValid}
        >
          {isEditing ? "Update Contact" : "Create Contact"}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ContactForm;
