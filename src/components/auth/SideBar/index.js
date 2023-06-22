import { Link } from "react-router-dom";
import { ListGroup, Accordion } from "react-bootstrap";

const SideBar = () => {
  return (
    <div className="bg-dark sidebar h-100">
      <ListGroup variant="flush">
        <ListGroup.Item className="p-4" action as={Link} to="/dashboard">
          Resumo
        </ListGroup.Item>

        <ListGroup.Item>
          <Accordion className="p-1" flush>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Itens</Accordion.Header>
              <Accordion.Body as="div">
                <ListGroup variant="flush">
                  <ListGroup.Item
                    action
                    className="px-0"
                    as={Link}
                    to="/dashboard/addItems"
                  >
                    Adicionar Itens
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="px-0"
                    action
                    as={Link}
                    to="/dashboard/items"
                  >
                    Lista de itens
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </ListGroup.Item>

        <ListGroup.Item action className="p-4" as={Link} to="/dashboard/sales">
          Vendas
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default SideBar;
