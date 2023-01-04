import { configureStore } from "@reduxjs/toolkit";
import authSlices from "./authorizationSlices/auth";

const store = configureStore({
  reducer: {
    auth: authSlices.reducer,
  },
});

export default store;
