import React, { useContext, useEffect } from "react";
import Context from "../../Context";
import Axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Request from "../../config/request.js";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();

  const { setErrors, setSuccesses, isLogged } = useContext(Context);

  //Send usar to dashboard if its logged
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

  const handleSignup = async () => {
    setSuccesses(false);

    try {
      await Axios.post(Request + "/signup", {
        params: {
          email: values.email,
          password: values.password,
        },
      }).then((response) => {
        if (response.data.errors) {
          setErrors(response.data.errors);
        } else if (response.data.successes) {
          setSuccesses(response.data.successes);
          navigate("/");
        }
      });
    } catch (e) {
      setErrors([{ message: e.message }]);
    }
  };

  return (
    <Form className="col-md-5 mx-auto" onSubmit={handleSubmit(handleSignup)}>
      <h1 className="m-5 text-center">Dashboards</h1>

      <Form.Group as={Row} className="mb-3" controlId="formEmail">
        <Form.Label column sm="4">
          E-mail
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

      <Form.Group as={Row} className="mb-3" controlId="formPassword">
        <Form.Label column sm="4">
          Senha
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
              Por favor, insira uma senha que possua 8 caracteres ou mais.
            </Form.Control.Feedback>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira uma senha que possua 32 caracteres ou menos.
            </Form.Control.Feedback>
          )}
          {errors.password && errors.password.type === "required" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira sua senha.
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formConfPassword">
        <Form.Label column sm="4">
          Cofirme sua senha
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="password"
            name="passwordConf"
            placeholder="Digite sua senha novamente"
            {...register("passwordConf", {
              required: true,
              validate: (value) => value === values.password,
            })}
            isInvalid={errors.passwordConf !== undefined ? true : false}
            isValid={
              !errors.passwordConf !== "" &&
              values.passwordConf !== undefined &&
              values.passwordConf !== ""
                ? true
                : false
            }
            onKeyUp={() => {
              trigger("passwordConf");
              console.log(errors.passwordConf);
            }}
          />
          {errors.passwordConf && errors.passwordConf.type === "required" && (
            <Form.Control.Feedback type="invalid">
              Por favor, insira sua senha novamente.
            </Form.Control.Feedback>
          )}
          {errors.passwordConf && errors.passwordConf.type === "validate" && (
            <Form.Control.Feedback type="invalid">
              As senhas não coincidem.
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-5">
        <Button variant="primary" size="lg" type="submit">
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
