import { useContext } from "react";
import Context from "../../../Context";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const { setErrors, errors, setSuccesses, successes, setIsLogged, isLogged } =
    useContext(Context);

  const logoutHandler = () => {
    setIsLogged(false);
    localStorage.removeItem("token");

    if (isLogged && localStorage.getItem("token")) {
      setErrors([
        ...errors,
        { message: "Não foi possível realizar o logout." },
      ]);
    } else {
      setSuccesses([...successes, { message: "Logout feito com sucesso." }]);
    }
  };

  return (
    <Navbar
      expand="sm"
      className="w-100 d-flex align-self-start navbar-dark bg-dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {/*<Nav.Link as={Link} to="/dashboard/profile">
              Perfil
            </Nav.Link>*/}
            <Nav.Link
              onClick={() => {
                logoutHandler();
              }}
            >
              Logout <BoxArrowRight />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
