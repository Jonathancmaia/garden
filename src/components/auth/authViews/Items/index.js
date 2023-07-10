import Context from "../../../../Context";
import { useContext } from "react";
import { Container, Row, Col, Table, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Trash, Gear } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Items = () => {
  const { Request } = useContext(Context);
  const [items, setItems] = useState(false);

  //Get all items
  useEffect(() => {
    Request("get", "/items", {}, true).then((data)=>{
      if(data){
        setItems(data.items);
      }
    });
  }, []);

  //Delete item
  const deleteItem = async (item) => {
    Request("delete", "/items/delete/" + item, {}, true);
  };

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
                    <td>{
                      new Intl.NumberFormat("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        parseInt(item.value) / 100
                      )}
                    </td>
                    <td>
                      <Link to={"att/"+item.id}>
                        <Gear className="icons" />
                      </Link>
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
            <Spinner animation="border" role="status"/>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Items;
