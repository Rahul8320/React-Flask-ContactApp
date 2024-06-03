import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { Contact } from "../models/contact";
import { ContactState, setModalState } from "../stores/contactSlice";
import ContactCard from "./ContactCard";

const ContactList = () => {
  const isLoading = useSelector((state: ContactState) => state.isLoading);
  const contacts = useSelector((state: ContactState) => state.contacts);

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: ContactState) => state.isModalOpen);

  const openCreateModal = () => {
    if (isModalOpen === false) {
      dispatch(setModalState(true));
    }
  };

  if (isLoading === true) {
    return <div className="loading">Loading......</div>;
  }

  return (
    <div className="p-2 relative">
      <h2 className="text-3xl text-center mb-5 font-semibold text-slate-700">
        Contacts
      </h2>
      <div className="mx-auto">
        {contacts.map((contact: Contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
      <button
        onClick={openCreateModal}
        className="absolute bottom-5 right-5 bg-blue-500 font-medium text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        <FaPlus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ContactList;
