import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Nav, Image, NavItem, NavLink, Button} from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:9000/verify", {
            withCredentials: true
        })
        .catch(() => navigate("/login-page"));
    }, [navigate]);

    useEffect(() => {
        axios.get("http://localhost:9000/dashboard-details", {
            withCredentials: true
        })
        .then((res) => {
            if (res.data.length > 0) {
                setUsername(res.data[0]);
            }
        })
        .catch((err) =>{
            if(err){
                console.log(err)
            }
        });
    }, []);
    const LogoutButton = async () => {
        try {
            await axios.get("http://localhost:9000/logout", {
                withCredentials: true
            });

            navigate("/login-page");
        } catch (err) {
            console.log(err);
        }
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
                            <h6 className="mt-2 mb-0">{username.FullName}</h6>
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
                                {username.FullName}
                            </Navbar.Brand>

                            <Nav className="ms-auto align-items-center">
                                <NavItem className="text-white me-4">Hi {username.FirstName}</NavItem>
                                <Button  variant="light" size="sm" className="fw-semibold" onClick={LogoutButton}>
                                    Logout
                                </Button>
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