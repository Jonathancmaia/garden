import Context from "../../../../Context";
import { useContext } from "react";
import { Container, Row, Col, Table, Spinner, ListGroup, Accordion } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Trash, Gear } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Sales = () => {
  const { Request } = useContext(Context);
  const [sales, setSales] = useState(false);

  //Get all sales
  const handleSales = async () => {
    Request("get", "/sales", {}, true).then((data)=>{
      if(data){
        setSales(data.sales);
      }
    });
  };

  //Delete sale
  const deleteSale = async (sale) => {
    Request("delete", "/sales/delete/" + sale, {}, true);
  };

  useEffect(() => {
    handleSales();
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
          {sales ? (
            <Table striped bordered hover className="overflow-auto">
              <thead>
                <tr>
                  <th>Vendas</th>
                  <th colSpan={2}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, i) => (
                  <tr key={i}>
                    <td className="p-0">
                      <Accordion flush>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>#{sale.id} - Total:
                            {new Intl.NumberFormat("pt-br", {
                                style: "currency",
                                currency: "BRL",
                              }).format(
                                parseInt(sale.total) / 100
                              )
                            }
                      </Accordion.Header>
                          <Accordion.Body className="p-0">
                            <Table striped bordered hover className="overflow-auto">
                              <thead>
                                <tr>
                                  <th>Item</th>
                                  <th>Nome</th>
                                  <th>Quantidade</th>
                                  <th>Valor</th>
                                </tr>
                              </thead>
                              <tbody>
                                {sale.items.map((item, i)=>(
                                  <tr key={i}>
                                    <td>
                                      {item.id}
                                    </td>
                                    <td>
                                      {item.name}
                                    </td>
                                    <td>
                                      {item.qtt}
                                    </td>
                                    <td>
                                    {new Intl.NumberFormat("pt-br", {
                                        style: "currency",
                                        currency: "BRL",
                                      }).format(
                                        parseInt(item.value) / 100
                                      )
                                    }
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </td>
                    <td>
                      <Link to={"att/"+sale.id}>
                        <Gear className="icons" />
                      </Link>
                    </td>
                    <td>
                      <Trash
                        className="icons"
                        onClick={() => {
                          deleteSale(sale.id);
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

export default Sales;