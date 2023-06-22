import Context from "../../../../Context";
import Axios from "axios";
import Request from "../../../../config/request.js";
import { useContext } from "react";
import { Container, Row, Col, Button, Table, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const Items = () => {
  const { setError, setSuccesses } = useContext(Context);
  const [items, setItems] = useState(false);

  useEffect(() => {
    const handleItems = async () => {
      setError(false);
      setSuccesses(false);

      try {
        await Axios.get(Request + "/items", {
          headers: {
            token: localStorage.getItem("token"),
          },
        }).then((response) => {
          if (response.data.errors) {
            setError(response.data.errors);
          } else if (response.data.successes) {
            setSuccesses(response.data.successes);
            setItems(response.data.items);
          }
        });
      } catch (e) {
        console.log(e);
      }
    };

    handleItems();
  }, []);
  return (
    <Container fluid>
      <Row className="pt-4">
        <Col>
          <h3>Lista de itens</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          {items ? (
            <Table striped bordered hover className="overflow-auto">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Items;
