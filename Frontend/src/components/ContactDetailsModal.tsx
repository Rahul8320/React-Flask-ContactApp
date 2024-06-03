import { Contact } from "../models/contact";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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

  const getInitials = () => {
    return `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg sm:w-3/5 md:w-2/5 lg:w-1/3">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-slate-700">
            Contact Details
          </h2>
          <RiCloseCircleLine
            className="h-10 w-6 text-gray-500 hover:text-gray-600 hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="px-4 py-5">
          <div className="ml-8 mr-5 flex justify-center">
            {contact.avatar ? (
              <img
                src={contact.avatar}
                alt={`${contact.firstName} ${contact.lastName}`}
                className="w-28 h-28 rounded-full mr-3"
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
