import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./contactSlice";

const store = configureStore({
  reducer: contactSlice,
});

export default store;
