import { useEffect } from "react";
import { contactService } from "./services/contactService";
import ContactList from "./components/ContactList";
import { useDispatch, useSelector } from "react-redux";
import ContactFormModal from "./components/ContactFormModal";
import "./App.css";
import { ContactState } from "./stores/contactSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";

function App() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const isLoading = useSelector((state: ContactState) => state.isLoading);
  const errorMessage = useSelector((state: ContactState) => state.error);

  useEffect(() => {
    contactService.getAllContact(dispatch);
  }, []);

  useEffect(() => {
    if (errorMessage !== null) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [errorMessage]);

  return (
    <div className="container max-w-3xl mx-auto my-5 rounded-md shadow-md bg-orange-100">
      <ContactList />
      <ContactFormModal />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
