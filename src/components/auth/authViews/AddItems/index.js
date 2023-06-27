import { useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Context from "../../../../Context";
import Axios from "axios";
import Request from "../../../../config/request.js";
import { useForm } from "react-hook-form";

const AddItems = () => {
  const { setErrors, setSuccesses } = useContext(Context);

  const handleAddItem = async () => {
    setErrors(false);
    setSuccesses(false);
    try {
      await Axios.put(Request + "/items/add", {
        params: {
          name: "",
          desc: "",
          price: "" /*reais + cents.toString().padStart(2, "0")*/,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.errors) {
          setErrors(response.data.errors);
        } else if (response.data.successes) {
          setSuccesses(response.data.successes);
        }
      });
    } catch (e) {
      setErrors([{ message: e.message }]);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    isValid,
    trigger,
    watch,
  } = useForm();

  const values = watch();

  return (
    <Container fluid>
      <Row className="pt-4">
        <Col>
          <h3>Adicionar novo item</h3>
          <Form onSubmit={handleSubmit(handleAddItem)}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nome do seu produto"
                {...register("name", {
                  required: true,
                  minLength: 2,
                  maxLength: 64,
                })}
                isInvalid={errors.name !== undefined ? true : false}
                isValid={
                  !errors.name !== "" &&
                  values.name !== undefined &&
                  values.name !== ""
                    ? true
                    : false
                }
                onKeyUp={() => {
                  trigger("name");
                }}
              />
              {errors.name && errors.name.type === "required" && (
                <Form.Control.Feedback type="invalid">
                  Por favor, insira um nome válido.
                </Form.Control.Feedback>
              )}
              {errors.name && errors.name.type === "minLength" && (
                <Form.Control.Feedback type="invalid">
                  O nome deve ter no mínimo 2 caracteres.
                </Form.Control.Feedback>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <Form.Control.Feedback type="invalid">
                  O nome deve ter no máximo 64 caracteres.
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Descrição <small className="text-muted">(opcional)</small>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Descrição do seu produto"
                {...register("desc", {
                  required: false,
                  minLength: 0,
                  maxLength: 128,
                })}
                isInvalid={errors.desc ? true : false}
                isValid={
                  !errors.desc &&
                  errors.desc !== "" &&
                  values.desc !== "" &&
                  values.desc !== undefined
                    ? true
                    : false
                }
                onKeyUp={() => {
                  trigger("desc");
                }}
              />
              {errors.desc && errors.desc.type === "maxLength" && (
                <Form.Control.Feedback type="invalid">
                  Insira uma descrição com até 128 caracteres.
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preço (R$)</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="0000"
                    type="number"
                    {...register("value", {
                      required: true,
                      min: 0,
                      max: 10000000000,
                      valueAsNumber: true,
                    })}
                    isInvalid={errors.value ? true : false}
                    isValid={
                      !errors.value || errors.value === undefined ? true : false
                    }
                    onKeyUp={(e) => {
                      trigger("value");
                      console.log(errors.value);
                    }}
                  />
                  {errors.value && errors.value.type === "required" && (
                    <Form.Control.Feedback type="invalid">
                      Por favor, insira um valor válido.
                    </Form.Control.Feedback>
                  )}
                  {errors.value &&
                    (errors.value.type === "min" ||
                      errors.value.type === "max") && (
                      <Form.Control.Feedback type="invalid">
                        Por favor, insira um valor válido entre 0 e
                        100.000.000,00.
                      </Form.Control.Feedback>
                    )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button variant="primary" size="lg" disabled={!isValid}>
                Adicionar Item
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddItems;
