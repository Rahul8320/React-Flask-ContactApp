import { useEffect } from "react";
import { contactService } from "./services/contactService";
import ContactList from "./components/ContactList";
import { useDispatch } from "react-redux";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    contactService.getAllContact(dispatch);
  }, []);

  return (
    <div className="container max-w-3xl mx-auto my-5 rounded-md shadow-md bg-orange-100">
      <ContactList />
      <Modal />
    </div>
  );
}

export default App;