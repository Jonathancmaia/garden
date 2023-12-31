import { useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Context from "../../../../Context";
import { useForm } from "react-hook-form";

const AddItems = () => {
  const { Request } = useContext(Context);

  const handleAddItem = async () => {
    Request("put", "/items/add", {
      name: values.name,
      desc: values.desc,
      price: values.value.replace( /\D/g,"")
    }, true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors: errorsForm },
    trigger,
    watch,
  } = useForm();

  const values = watch();

  return (
    <Container fluid>
      <Row className="pt-4">
        <Col>
          <h3>Adicionar novo item</h3>

          <Form noValidate onSubmit={handleSubmit(handleAddItem)}>
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
                isInvalid={errorsForm.name !== undefined ? true : false}
                isValid={
                  !errorsForm.name !== "" &&
                  values.name !== undefined &&
                  values.name !== ""
                    ? true
                    : false
                }
                onKeyUp={() => {
                  trigger("name");
                }}
              />
              {errorsForm.name && errorsForm.name.type === "required" && (
                <Form.Control.Feedback type="invalid">
                  Por favor, insira um nome válido.
                </Form.Control.Feedback>
              )}
              {errorsForm.name && errorsForm.name.type === "minLength" && (
                <Form.Control.Feedback type="invalid">
                  O nome deve ter no mínimo 2 caracteres.
                </Form.Control.Feedback>
              )}
              {errorsForm.name && errorsForm.name.type === "maxLength" && (
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
                isInvalid={errorsForm.desc ? true : false}
                isValid={
                  !errorsForm.desc &&
                  errorsForm.desc !== "" &&
                  values.desc !== "" &&
                  values.desc !== undefined
                    ? true
                    : false
                }
                onKeyUp={() => {
                  trigger("desc");
                }}
              />
              {errorsForm.desc && errorsForm.desc.type === "maxLength" && (
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
                    type="text"
                    defaultValue="R$ 00,00"
                    {...register("value", {
                      required: true,
                      minLengh: -1,
                      maxLength: 11,
                    })}
                    isInvalid={errorsForm.value ? true : false}
                    isValid={
                      !errorsForm.value &&
                      values.value !== undefined &&
                      values.value !== ""
                        ? true
                        : false
                    }
                    onKeyUp={(e) => {
                      //format value
                      if (
                        !isNaN(parseInt(e.target.value.replace(/[^\d.-]/g, "")))
                      ) {
                        e.target.value = new Intl.NumberFormat("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          parseInt(e.target.value.replace(/[^\d.-]/g, "")) / 100
                        );
                      } else {
                        e.target.value = "R$ 00,00";
                      }

                      trigger("value");
                    }}
                  />
                  {errorsForm.value && errorsForm.value.type === "required" && (
                    <Form.Control.Feedback type="invalid">
                      Por favor, insira um valor válido.
                    </Form.Control.Feedback>
                  )}
                  {errorsForm.value &&
                    errorsForm.value.type === "minLength" && (
                      <Form.Control.Feedback type="invalid">
                        Por favor, insira um valor maior que 0.
                      </Form.Control.Feedback>
                    )}
                  {errorsForm.value &&
                    errorsForm.value.type === "maxLength" && (
                      <Form.Control.Feedback type="invalid">
                        Por favor, insira um valor maior que 9.999,99.
                      </Form.Control.Feedback>
                    )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="submit" variant="primary" size="lg">
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
