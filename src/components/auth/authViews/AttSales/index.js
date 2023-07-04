import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table, Spinner } from "react-bootstrap";
import Context from "../../../../Context";
import { useParams } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";

const AttSales = () => {
  const { Request } = useContext(Context);
  const [sale, setSale] = useState(null);
  const [total, setTotal] = useState(0);

  let { id } = useParams();

  const handleSale = () => {
    Request("get", "/sales/" + id, {}, true).then((data)=>{
      if(data){
        setSale(data.sale);
      }
    });
  };

  useEffect(()=>{
    handleSale();
  }, []);

  const handleAttSale = async () => {
    Request("patch", "/sales/att/" + id, {
      items: sale.items
    }, true);
  };

  const deleteItem = (item)=>{

    sale.items.splice(item, 1);

    setSale( prevState => {
        return {...prevState, items: sale.items}
    })
  }

  useEffect(()=>{
    if(sale){
        let totalValue = 0;
        sale.items.forEach( (item) =>{
            totalValue += item.value * item.qtt;
        });
        setTotal(totalValue);
    }
  },[sale]);

  return (
    <Container fluid>
      <Row className="pt-4">
        <Col>
            <h3>Editar venda</h3>

            <h4>Items</h4>
            {sale ?
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sale.items.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        onKeyUp={ (e) => {
                                            setSale( prevState => {
                                                const updatedItems = [...prevState.items];
                                                updatedItems[i] = {
                                                    ...updatedItems[i],
                                                    qtt: e.target.value
                                                };

                                                return {
                                                    ...prevState,
                                                    items: updatedItems
                                                };
                                            })
                                        }}
                                        defaultValue={sale.items[i].qtt}
                                    />
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
                                <td>
                                    <Trash
                                        className="icons"
                                        onClick={() => {
                                            deleteItem(i);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2}>
                                Total:
                            </td>
                            <td colSpan={3}>
                                {new Intl.NumberFormat("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(
                                    parseInt(total) / 100
                                )
                                }
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <Button size="lg">Atualizar venda</Button>
            </>
                
            : <Spinner/>}          
        </Col>
      </Row>
    </Container>
  );
};

export default AttSales;