import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const SideBar = () => {
  return (
    <div className="bg-dark sidebar h-100">
      <ListGroup className="p-2">
        <ListGroup.Item action variant="dark" as={Link} to="/dashboard">
          Resumo
        </ListGroup.Item>
        <ListGroup.Item action variant="dark" as={Link} to="/dashboard/items">
          Itens
        </ListGroup.Item>
        <ListGroup.Item action variant="dark" as={Link} to="/dashboard/sales">
          Sales
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default SideBar;
