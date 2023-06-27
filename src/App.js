import React, { useContext } from "react";
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

  return (
    <Container fluid className="p-0">
      {successes ? (
        <Alert className="col-md-5" variant={"success"} dismissible>
          <Alert.Heading>
            <CheckAll /> Success!
          </Alert.Heading>
          {successes.map((suc, i) => (
            <p key={i}>{suc.message}</p>
          ))}
        </Alert>
      ) : (
        <></>
      )}
      {errors ? (
        <Alert className="col-md-5" variant={"danger"} dismissible>
          <Alert.Heading>
            <Fire /> Error!
          </Alert.Heading>
          {errors.map((err, i) => (
            <p key={i}>{err.message}</p>
          ))}
        </Alert>
      ) : (
        <></>
      )}

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
