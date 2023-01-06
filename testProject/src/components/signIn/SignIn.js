import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Form } from "react-bootstrap";
import styled from "./signIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/authorizationSlices/auth";
import { useNavigate } from "react-router";
// import { useNavigate } from "react-router";

const SignIn = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const { user: userYes } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userYes);
  const onChangeName = (e) => {
    setUser((prev) => {
      return { ...prev, name: e.target.value };
    });
  };
  const onChangePassword = (e) => {
    setUser((prev) => {
      return { ...prev, password: e.target.value };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({ name: user.name, password: user.password }));
  };
  useEffect(() => {
    if (Object.keys(userYes).length !== 0) {
      navigate("/ink");
    }
  }, [userYes]);

  return (
    <div className={styled.container}>
      <Card style={{ padding: "30px" }}>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter name"
              value={user.name}
              onChange={onChangeName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={onChangePassword}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
