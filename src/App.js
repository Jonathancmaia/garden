import React, { useContext, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { Fire, CheckAll } from "react-bootstrap-icons";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/auth/Dashboard";
import Context from "./Context";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  const { errors, successes } = useContext(Context);

  useEffect(() => {
    for (let i = 0; i < document.getElementsByClassName("alert").length; i++) {
      document
        .getElementsByClassName("alert")
        [i].addEventListener("animationend", () => {
          document.getElementsByClassName("alert")[i].style.display = "none";
        });
    }
  }, [errors, successes]);

  return (
    <Container fluid className="p-0">
      <div className="alert-handler">
        {successes.length > 0 ? (
          successes.map((suc, i) => (
            <Alert className="col-md-5 alert" variant={"success"} key={i}>
              <Alert.Heading>
                <CheckAll /> Success!
              </Alert.Heading>
              <div className="loading-bar"></div>
              <p>{suc.message}</p>
            </Alert>
          ))
        ) : (
          <></>
        )}
        {errors.length > 0 ? (
          errors.map((err, i) => (
            <Alert
              className="col-md-5 alert"
              variant={"danger"}
              key={i}
              dismissible
            >
              <Alert.Heading>
                <Fire /> Error!
              </Alert.Heading>
              <div className="loading-bar"></div>
              <p>{err.message}</p>
            </Alert>
          ))
        ) : (
          <></>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Container>
  );
}

export default App;
