import { Form, Button, Row, Col } from "react-bootstrap";
import Context from "../../Context";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const Login = () => {
  const navigate = useNavigate();

  const { isLogged, setIsLogged, Request } =
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
    formState: { errors: errorsForm },
    trigger,
    watch,
  } = useForm();

  const values = watch();

  const handleLogin = () => {
    Request("post", "/login", {
      email: values.email,
      password: values.password,
    }, false).then((data)=>{
      if(data){
        localStorage.setItem("token", data.token);
        setIsLogged(true);
      }
    });
  };

  //Snippet that hide or show password
  const [show, setShow] = useState(false);

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
            isInvalid={errorsForm.email !== undefined ? true : false}
            isValid={
              !errorsForm.email !== "" &&
              values.email !== undefined &&
              values.email !== ""
                ? true
                : false
            }
            onKeyUp={() => {
              trigger("email");
            }}
          />
          {errorsForm.email && errorsForm.email.type === "pattern" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira um email válido.
            </Form.Control.Feedback>
          )}
          {errorsForm.email && errorsForm.email.type === "required" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira um email.
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">
          Senha
          {show ? (
            <EyeSlash
              className="show-hide-password mx-2"
              onClick={() => {
                setShow(false);
              }}
            />
          ) : (
            <Eye
              className="show-hide-password mx-2"
              onClick={() => {
                setShow(true);
              }}
            />
          )}
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type={show ? "text" : "password"}
            name="password"
            placeholder="Senha"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 32,
            })}
            isInvalid={errorsForm.password !== undefined ? true : false}
            isValid={
              !errorsForm.password !== "" &&
              values.password !== undefined &&
              values.password !== ""
                ? true
                : false
            }
            onKeyUp={() => {
              trigger("password");
            }}
          />
          {errorsForm.password && errorsForm.password.type === "minLength" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira sua senha, que possui 8 caracteres ou mais.
            </Form.Control.Feedback>
          )}
          {errorsForm.password && errorsForm.password.type === "maxLength" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira sua senha, que possui 32 caracteres ou menos.
            </Form.Control.Feedback>
          )}
          {errorsForm.password && errorsForm.password.type === "required" && (
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
