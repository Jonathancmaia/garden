import { Form, Button, Row, Col } from "react-bootstrap";
import Request from "../../config/request.js";
import Axios from "axios";
import Context from "../../Context";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const { setErrors, setSuccesses, isLogged, setIsLogged } =
    useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    if (isLogged) {
      navigate("/dashboard");
    }
  }, [isLogged]);

  const handleLogin = async () => {
    setErrors(false);
    setSuccesses(false);

    try {
      await Axios.post(Request + "/login", {
        params: {
          email: document.getElementById("formEmail").value,
          password: document.getElementById("formPassword").value,
        },
      }).then((response) => {
        if (response.data.errors) {
          setErrors(response.data.errors);
        } else if (response.data.successes) {
          setSuccesses(response.data.successes);
          localStorage.setItem("token", response.data.token);
          setIsLogged(true);
        }
      });
    } catch (e) {
      setErrors([{ message: e.message }]);
    }
  };

  return (
    <Form className="col-md-5 mx-auto d-flex flex-column align-self-center">
      <h1 className="m-5 text-center">Dashboards</h1>
      <Form.Group as={Row} className="mb-3" controlId="formEmail">
        <Form.Label column sm="4">
          Email
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
          Password
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
            Por favor, sua senha que possui entre 6 e 32 caracteres.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mt-5" controlId="formSubmit">
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            handleLogin();
          }}
          disabled={email === true && password === true ? false : true}
        >
          Login
        </Button>
      </Form.Group>
      <Form.Group>
        <Form.Text className="d-flex justify-content-center m-2" muted>
          Não possui uma conta?<Link to="/signup">Cadastre-se</Link>
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export default Login;
