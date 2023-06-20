import React, { useContext, useState, useEffect } from "react";
import Context from "../../Context";
import Axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Request from "../../config/request.js";

const Signup = () => {
  const navigate = useNavigate();

  const { setError, setSuccesses, isLogged } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  useEffect(() => {
    if (isLogged) {
      navigate("/dashboard");
    }
  }, [isLogged]);

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      setEmail(true);
    }
  }, [email]);

  useEffect(() => {
    if (
      document.getElementById("formPassword").value.length >= 6 &&
      document.getElementById("formPassword").value.length <= 32
    ) {
      setPassword(true);
    }
  }, [password]);

  useEffect(() => {
    if (
      document.getElementById("formConfPassword").value ===
        document.getElementById("formPassword").value &&
      password
    ) {
      setConfPassword(true);
    }
  }, [confPassword, password]);

  const handleSignup = async () => {
    setSuccesses(false);

    await Axios.post(Request + "/signup", {
      params: {
        email: document.getElementById("formEmail").value,
        password: document.getElementById("formPassword").value,
      },
    }).then((response) => {
      if (response.data.errors) {
        setError(response.data.errors);
      } else if (response.data.successes) {
        setSuccesses(response.data.successes);
        navigate("/");
      }
    });
  };

  return (
    <Form className="col-md-5 mx-auto">
      <h1 className="m-5 text-center">Dashboards</h1>
      <Form.Group as={Row} className="mb-3" controlId="formEmail">
        <Form.Label column sm="4">
          E-mail
        </Form.Label>
        <Col sm="8">
          <Form.Control
            placeholder="email@example.com"
            onKeyUp={(e) => {
              setEmail(e.target.value);
            }}
            isValid={email === true ? true : false}
            isInvalid={email !== true && email !== "" ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira um e-mail válido.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPassword">
        <Form.Label column sm="4">
          Senha
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="password"
            placeholder="Senha"
            onKeyUp={(e) => {
              setPassword(e.target.value);
            }}
            isValid={password === true ? true : false}
            isInvalid={password !== true && password !== "" ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira uma senha entre 6 e 32 dígitos.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formConfPassword">
        <Form.Label column sm="4">
          Cofirme sua senha
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            onKeyUp={(e) => {
              setConfPassword(e.target.value);
            }}
            isValid={confPassword === true ? true : false}
            isInvalid={
              confPassword !== true && confPassword !== "" ? true : false
            }
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira a senha novamente.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mt-5" controlId="formSubmit">
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            handleSignup();
          }}
          disabled={
            email === true && password === true && confPassword === true
              ? false
              : true
          }
        >
          Cadastre-se
        </Button>
      </Form.Group>
      <Form.Group>
        <Form.Text className="d-flex justify-content-center m-2" muted>
          Já possui uma conta? <Link to="/">Faça o Login</Link>
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export default Signup;
