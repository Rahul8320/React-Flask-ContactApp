import { AddContactModel } from "../models/contact";
import { contactService } from "../services/contactService";
import { useDispatch, useSelector } from "react-redux";
import { ContactState, setModalState } from "../stores/contactSlice";
import Loading from "./Loading";
import { RiCloseCircleLine } from "react-icons/ri";
import { useFormContext } from "react-hook-form";
import { Schema } from "../models/schema";
import { Stack, TextField } from "@mui/material";

const ContactForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: ContactState) => state.error);
  const isLoading = useSelector((state: ContactState) => state.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useFormContext<Schema>();

  const createContact = async (data: AddContactModel) => {
    await contactService.createNewContact(data, dispatch);

    setTimeout(() => {
      reset();
    }, 2000);
  };

  const handleClose = () => {
    dispatch(setModalState(false));
    reset();
  };

  if (isLoading === true) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-slate-700">
          Add New Contact
        </h2>
        <RiCloseCircleLine
          className="h-10 w-6 text-gray-500 hover:text-gray-600 hover:cursor-pointer"
          onClick={handleClose}
        />
      </div>
      <form onSubmit={handleSubmit(createContact)}>
        <Stack sx={{ gap: 2 }}>
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
          Create Contact
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ContactForm;
