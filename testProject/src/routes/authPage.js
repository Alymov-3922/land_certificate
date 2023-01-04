import React from "react";
import { Navigate, Route, Routes } from "react-router";
import SignIn from "../components/signIn/SignIn";

const authPage = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default authPage;
