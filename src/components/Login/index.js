import { Form, Button, Row, Col } from "react-bootstrap";
import Request from "../../config/request.js";
import Axios from "axios";
import Context from "../../Context";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();

  const { setErrors, setSuccesses, isLogged, setIsLogged } =
    useContext(Context);

  //Send user to dashboard if its logged
  useEffect(() => {
    if (isLogged) {
      navigate("/dashboard");
    }
  }, [isLogged]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const values = watch();

  const handleLogin = async () => {
    setErrors(false);
    setSuccesses(false);

    try {
      await Axios.post(Request + "/login", {
        params: {
          email: values.email,
          password: values.password,
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
    <Form
      className="col-md-5 mx-auto d-flex flex-column align-self-center"
      onSubmit={handleSubmit(handleLogin)}
    >
      <h1 className="m-5 text-center">Dashboards</h1>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">
          Email
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="email"
            placeholder="example@gmail.com"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              },
            })}
            isInvalid={errors.email !== undefined ? true : false}
            isValid={
              !errors.email !== "" &&
              values.email !== undefined &&
              values.email !== ""
                ? true
                : false
            }
            onKeyUp={() => {
              trigger("email");
            }}
          />
          {errors.email && errors.email.type === "pattern" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira um email válido.
            </Form.Control.Feedback>
          )}
          {errors.email && errors.email.type === "required" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira um email.
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">
          Password
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="password"
            name="password"
            placeholder="Senha"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 32,
            })}
            isInvalid={errors.password !== undefined ? true : false}
            isValid={
              !errors.password !== "" &&
              values.password !== undefined &&
              values.password !== ""
                ? true
                : false
            }
            onKeyUp={() => {
              trigger("password");
            }}
          />
          {errors.password && errors.password.type === "minLength" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira sua senha, que possui 8 caracteres ou mais.
            </Form.Control.Feedback>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira sua senha, que possui 32 caracteres ou menos.
            </Form.Control.Feedback>
          )}
          {errors.password && errors.password.type === "required" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira sua senha.
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-5">
        <Button type="submit" variant="primary" size="lg">
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
