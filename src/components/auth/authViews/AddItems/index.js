import { useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Context from "../../../../Context";
import Axios from "axios";
import Request from "../../../../config/request.js";

const AddItems = () => {
  const { setError, setSuccesses } = useContext(Context);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [reais, setReais] = useState("");
  const [cents, setCents] = useState("");

  //Validate name
  useEffect(() => {
    if (name.length >= 2 && name.length <= 64) {
      setName(true);
    }
  }, [name]);

  //Validate desc
  useEffect(() => {
    if (desc.length <= 128 && desc !== "") {
      setDesc(true);
    }
  }, [desc]);

  //Validate reais
  useEffect(() => {
    if (reais >= 0 && reais <= 100000000 && reais !== "") {
      setReais(true);
    }
  }, [reais]);

  //Validate cents
  useEffect(() => {
    if (cents >= 0 && cents <= 99 && cents !== "") {
      setCents(true);
    }
  }, [cents]);

  const handleAddItem = async () => {
    setError(false);
    setSuccesses(false);
    try {
      await Axios.post(Request + "/items/add", {
        params: {
          name: name,
          desc: desc,
          price: reais + cents.toString().padStart(2, "0"),
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.errors) {
          setError(response.data.errors);
        } else if (response.data.successes) {
          setSuccesses(response.data.successes);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container fluid>
      <Row className="pt-4">
        <Col>
          <h3>Adicionar novo item</h3>
          <Form>
            <Form.Group className="mb-3" controlId="addItem">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do seu produto"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                isValid={name === true ? true : false}
                isInvalid={name !== true && name !== "" ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, insira um nome válido entre 2 e 64 carcateres.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="addItem">
              <Form.Label>
                Descrição <small className="text-muted">(opcional)</small>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Descrição do seu produto"
                onKeyUp={(e) => {
                  setDesc(e.target.value);
                }}
                isValid={desc === true ? true : false}
                isInvalid={desc !== true && desc !== "" ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, insira uma descrição com até 164 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="addItem">
              <Form.Label>Preço (R$)</Form.Label>
              <Row>
                <Col className="col-6">
                  <Form.Control
                    type="number"
                    placeholder="00"
                    onKeyUp={(e) => {
                      setReais(e.target.value);
                    }}
                    isValid={reais === true ? true : false}
                    isInvalid={reais !== true && reais !== "" ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, insira um valor válido entre 0 e 100.000.000.
                  </Form.Control.Feedback>
                </Col>
                <Col className="col-1 display-5">,</Col>
                <Col className="col-5">
                  <Form.Control
                    type="number"
                    placeholder="00"
                    onKeyUp={(e) => {
                      setCents(e.target.value);
                    }}
                    isValid={cents === true ? true : false}
                    isInvalid={cents !== true && cents !== "" ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, insira um valor válido entre 0 e 99.
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="addItem">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  handleAddItem();
                }}
                disabled={
                  (name === true &&
                    desc === true &&
                    reais === true &&
                    cents === true) ||
                  (name === true &&
                    desc === "" &&
                    reais === true &&
                    cents === true)
                    ? false
                    : true
                }
              >
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
