import { Contact } from "../models/contact";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUserEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setModalState, setSelectedContact } from "../stores/contactSlice";
import Tooltip from "@mui/material/Tooltip";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { contactService } from "../services/contactService";
import { useSnackbar } from "notistack";

type ContactDetailsProps = {
  show: boolean;
  onClose: () => void;
  contact: Contact;
};

const ContactDetailsModal = ({
  show,
  onClose,
  contact,
}: ContactDetailsProps) => {
  if (!show || !contact) {
    return null;
  }

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const getInitials = () => {
    return `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();
  };

  const handleEdit = () => {
    dispatch(setSelectedContact(contact));
    dispatch(setModalState(true));
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteContact = async () => {
    setOpenDeleteDialog(false);
    await contactService.deleteContact(contact.id, dispatch, enqueueSnackbar);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg sm:w-3/5 md:w-2/5 lg:w-1/3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-slate-700 mr-5">
              Contact Details
            </h2>
            <Tooltip title="Update" className="mx-3">
              <IconButton onClick={handleEdit}>
                <FaUserEdit className="text-lg text-slate-500 hover:cursor-pointer hover:text-green-500 hover:scale-110" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" className="mx-3">
              <IconButton onClick={handleOpenDeleteDialog}>
                <FaTrash className="text-sm text-slate-500 hover:cursor-pointer hover:text-red-500 hover:scale-110" />
              </IconButton>
            </Tooltip>
          </div>
          <RiCloseCircleLine
            className="text-xl text-gray-500 hover:text-gray-600 hover:cursor-pointer hover:scale-110"
            onClick={onClose}
          />
        </div>
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            className="text-red-700 font-semibold"
          >
            Do you want to delete this contact?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This operation can not be undone. Please make sure you seriously
              want to delete this contact.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Disagree</Button>
            <Button onClick={handleDeleteContact}>Agree</Button>
          </DialogActions>
        </Dialog>
        <div className="px-4 py-5">
          <div className="ml-8 mr-5 flex justify-center">
            {contact.avatar ? (
              <img
                src={contact.avatar}
                alt={`${contact.firstName} ${contact.lastName}`}
                className="w-32 h-32 rounded-full border-2 border-slate-600 shadow-md"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-slate-500 flex items-center justify-center text-stone-100 text-xl mr-3">
                {getInitials()}
              </div>
            )}
          </div>
          <h2 className="text-center text-xl text-slate-700 font-semibold mt-4">
            {contact.firstName} {contact.lastName}
          </h2>
          <div className="bg-slate-100 rounded-lg p-3 mt-5">
            <p className="font-medium text-slate-600">Contact info</p>
            <div className="mx-2">
              <p className="text-slate-600 font-mono my-2 flex items-center">
                <FaPhoneAlt className="mx-3" />
                {contact.phoneNumber}
              </p>
              <p className="text-slate-600 font-mono my-2 flex items-center">
                <MdEmail className="mx-3" />
                {contact.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsModal;
