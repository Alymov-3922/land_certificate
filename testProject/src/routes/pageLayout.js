import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import SignIn from "../components/signIn/SignIn";
import Form from "../components/form/form";
import Document from "../components/document/document";
import { useSelector } from "react-redux";

const PageLayout = () => {
  const { user, ink } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
    }
  }, [user]);
  useEffect(() => {
    if (ink.length !== 0) {
      navigate("/document");
    }
  }, [ink]);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/ink" element={<Form />} />
      <Route path="/document" element={<Document />} />
      <Route path="*" element={<div>not found</div>} />
    </Routes>
  );
};

export default PageLayout;
