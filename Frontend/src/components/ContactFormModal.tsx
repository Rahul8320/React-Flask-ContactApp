import { useSelector } from "react-redux";
import { ContactState } from "../stores/contactSlice";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactForm from "./ContactForm";
import { defaultValues, schema, Schema } from "../models/schema";

const ContactFormModal = () => {
  const isModalOpen = useSelector((state: ContactState) => state.isModalOpen);

  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg sm:w-3/5 md:w-2/5 lg:w-1/3">
            <FormProvider {...methods}>
              <ContactForm />
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactFormModal;
