import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table, Spinner } from "react-bootstrap";
import Context from "../../../../Context";
import { Trash, PlusCircle } from "react-bootstrap-icons";

const AddSales = () => {
  const { Request } = useContext(Context);
  const [sale, setSale] = useState({items: []});
  const [items, setItems] = useState(null);
  const [total, setTotal] = useState(0);


  useEffect(()=>{
    Request("get", "/items", {}, true).then((data)=>{
        if(data){
            setItems(data.items);
        }
    })
  }, []);

  useEffect(()=>{
    if(sale){
        let totalValue = 0;
        sale.items.forEach( (item) =>{
            totalValue += item.value * item.qtt;
        });
        setTotal(totalValue);
    }
  },[sale]);

  const handleAddSale = async () => {
    console.log(JSON.stringify(sale.items))
    /*Request("patch", "/sales/add", {
      items: JSON.stringify(sale.items)
    }, true);*/
  };

  const deleteItem = (item)=>{

    const updatedItems = [...sale.items];
    updatedItems.splice(item, 1);

    setSale((prevState) => {
        return { ...prevState, items: updatedItems };
    });
  }

  const addItem = (item)=>{
    const updatedItems = [...sale.items];
    updatedItems.push({
        name: item.name,
        value: item.value,
        id: item.id,
        qtt: 1,
    });

    setSale((prevState) => {
        return { ...prevState, items: updatedItems.sort((a, b) => a.id - b.id) };
    });
  }

  return (
    <Container fluid>
      <Row>
        <Col>
        
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
                            {items.filter(item => !sale.items.some(saleItem => saleItem.id === item.id)).map((item, i) => (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.desc}</td>
                                    <td>
                                        {new Intl.NumberFormat("pt-br", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format(
                                            parseInt(item.value) / 100
                                        )}
                                    </td>
                                    <td>
                                        <PlusCircle onClick={()=>{addItem(item)}}/>
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

            <Row>
                <Col>
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
                                                onChange={ (e) => {
                                                    if(e.target.value >= 0 && e.target.value <= 10000){
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
                                                        });
                                                    } else {
                                                        e.target.value = 1;
                                                    }
                                                }}

                                                onBlur={(e)=>{
                                                    if (e.target.value === ""){
                                                        e.target.value = 1;
                                                    }
                                                }}

                                                value={sale.items[i].qtt}
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
                        <Button
                            disabled={sale.items.length === 0 ? true : false}
                            onClick={()=>{handleAddSale()}}
                            size="lg"
                        >
                            Realizar venda
                        </Button>
                    </>
                        
                    : <Spinner/>}          
                </Col>
            </Row>

        </Col>
      </Row>
    </Container>
  );
};

export default AddSales;