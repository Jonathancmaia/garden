import Context from "../../../../Context";
import Axios from "axios";
import Request from "../../../../config/request.js";
import { useContext } from "react";
import { Container, Row, Col, Button, Table, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Trash, Gear } from "react-bootstrap-icons";

const Items = () => {
  const { setErrors, errors, setSuccesses, successes } = useContext(Context);
  const [items, setItems] = useState(false);

  //Get all items
  const handleItems = async () => {
    try {
      await Axios.get(Request + "/items", {
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.errors) {
          setErrors([...errors, response.data.errors[0]]);
        } else if (response.data.successes) {
          setSuccesses([...successes, response.data.successes[0]]);
          setItems(response.data.items);
        }
      });
    } catch (e) {
      setErrors([...errors, { message: e.message }]);
    }
  };

  //Delete item
  const deleteItem = async (item) => {
    try {
      await Axios.delete(Request + "/items/delete/" + item, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.errors) {
          setErrors([...errors, response.data.errors[0]]);
        } else if (response.data.successes) {
          setSuccesses([...successes, response.data.successes[0]]);
        }
      });
    } catch (e) {
      setErrors([...errors, { message: e.message }]);
    }
  };

  useEffect(() => {
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
                  <th colSpan={2}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.value}</td>
                    <td>
                      <Gear className="icons" />
                    </td>
                    <td>
                      <Trash
                        className="icons"
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                      />
                    </td>
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
