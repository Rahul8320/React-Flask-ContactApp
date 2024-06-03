import { useState } from "react";
import { AddContactModel } from "../models/contact";
import { contactService } from "../services/contactService";
import { useDispatch, useSelector } from "react-redux";
import { ContactState } from "../stores/contactSlice";
import Loading from "./Loading";

const ContactForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const dispatch = useDispatch();
  const error = useSelector((state: ContactState) => state.error);
  const isLoading = useSelector((state: ContactState) => state.isLoading);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data: AddContactModel = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    await contactService.createNewContact(data, dispatch);
  };

  if (isLoading === true) {
    return <Loading />;
  }

  return (
    <div>
      <h2>Create new contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit">Create Contact</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ContactForm;
