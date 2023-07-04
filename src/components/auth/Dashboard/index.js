import { useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

//custom imports
import Context from "../../../Context";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";
import Resume from "../authViews/Resume";
import Profile from "../authViews/Profile";
import AddItems from "../authViews/AddItems";
import AttItems from "../authViews/AttItems";
import AttSales from "../authViews/AttSales";
import Items from "../authViews/Items";
import Sales from "../authViews/Sales";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogged } = useContext(Context);

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  return (
    <>
      <NavigationBar />
      <Row className="h-100">
        <Col className="col-sm-3">
          <SideBar />
        </Col>
        <Col className="col-sm-9">
          {location.pathname === "/dashboard" ? <Resume /> : <></>}

          {/* Auth Routes */}
          <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="additems" element={<AddItems />} />
            <Route path="items" element={<Items />} />
            <Route path="sales" element={<Sales />} />
            <Route path="items/att/:id" element={<AttItems/>}/>
            <Route path="sales/att/:id" element={<AttSales/>}/>
          </Routes>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
