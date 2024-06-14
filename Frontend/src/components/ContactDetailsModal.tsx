import { Contact } from "../models/contact";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUserEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setModalState, setSelectedContact } from "../stores/contactSlice";

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

  const dispatch = useDispatch();

  const getInitials = () => {
    return `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();
  };

  const handleEdit = () => {
    dispatch(setSelectedContact(contact));
    dispatch(setModalState(true));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg sm:w-3/5 md:w-2/5 lg:w-1/3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-slate-700 mr-5">
              Contact Details
            </h2>
            <FaUserEdit
              onClick={handleEdit}
              className="mx-3 text-lg text-slate-500 hover:cursor-pointer hover:text-green-500 hover:scale-110"
            />
            <FaTrash className="text-sm text-slate-500 hover:cursor-pointer hover:text-red-500 hover:scale-110" />
          </div>
          <RiCloseCircleLine
            className="text-xl text-gray-500 hover:text-gray-600 hover:cursor-pointer hover:scale-110"
            onClick={onClose}
          />
        </div>
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
