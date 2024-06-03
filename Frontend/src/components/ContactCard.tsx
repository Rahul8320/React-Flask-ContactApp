import { Contact } from "../models/contact";

type ContactCardProps = {
  contact: Contact;
};

const ContactCard = ({ contact }: ContactCardProps) => {
  const { firstName, lastName, phoneNumber, avatar } = contact;
  const getInitials = () => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <div className="container w-1/2 mx-auto bg-gray-200 flex p-2 items-center my-2 rounded-md shadow-md hover:bg-slate-300 hover:cursor-pointer">
      <div className="ml-8 mr-5">
        {avatar ? (
          <img
            src={avatar}
            alt={`${firstName} ${lastName}`}
            className="w-12 h-12 rounded-full mr-3"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center text-stone-100 text-xl mr-3">
            {getInitials()}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-medium text-slate-800">
          {firstName} {lastName}
        </p>
        <p className="text-lg font-medium text-slate-600">{phoneNumber}</p>
      </div>
    </div>
  );
};

export default ContactCard;
