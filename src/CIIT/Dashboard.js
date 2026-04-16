import axios from "axios";
import { useEffect } from "react";
import { Container, Row, Col, Navbar, Nav, Image} from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:9000/verify", {
            withCredentials: true
        })
        .catch(() => navigate("/login-page"));
    }, [navigate]);

    const LogoutButton = () => {
        navigate("/login-page");
    };

    return (
        <Container fluid className="p-0">

            <Row className="g-0">

                {/* LEFT SIDEBAR */}
                <Col md={2} className="bg-primary vh-100">

                    <div className="p-3">

                        {/* PROFILE */}
                        <div className="bg-light rounded text-center p-3 mb-3">
                            <Image src={null} roundedCircle width={70} height={70} alt="profileimg"/>
                            <h6 className="mt-2 mb-0">Vikas Sontakke</h6>
                        </div>

                        {/* MENU */}
                        <div className="d-flex flex-column bg-white rounded">

                            <NavLink to="" className="text-primary text-decoration-none py-2 px-3 border-bottom">Dashboard</NavLink>
                            <NavLink to="profile" className="text-primary text-decoration-none py-2 px-3 border-bottom">Profile</NavLink>
                            <NavLink to="batches" className="text-primary text-decoration-none py-2 px-3 border-bottom">Batches</NavLink>
                            <NavLink to="payments" className="text-primary text-decoration-none py-2 px-3 border-bottom">Payments</NavLink>
                            <NavLink to="practice-exams" className="text-primary text-decoration-none py-2 px-3 border-bottom">Practice Exams</NavLink>
                            <NavLink to="video-tutorial" className="text-primary text-decoration-none py-2 px-3">Video Tutorial</NavLink>

                        </div>

                    </div>
                </Col>

                {/* RIGHT CONTENT */}
                <Col md={10} className="ps-2">

                    {/* TOP NAVBAR */}
                    <Navbar bg="primary" variant="dark" expand="lg">
                        <Container fluid>

                            <Navbar.Brand>
                                Vikas Sontakke
                            </Navbar.Brand>

                            <Nav className="ms-auto">
                                <Nav.Link className="text-white">Hi</Nav.Link>
                                <Nav.Link className="text-white" onClick={LogoutButton}>
                                    Logout
                                </Nav.Link>
                            </Nav>

                        </Container>
                    </Navbar>

                    {/* MAIN CONTENT AREA */}
                    <div style={{padding:"10px"}}>
                        <Outlet/>
                    </div>

                </Col>

            </Row>

        </Container>
    );
};

export default Dashboard;