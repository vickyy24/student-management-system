import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Navbar, Nav, Image, NavItem, Button, Modal, ModalTitle, ModalBody, ModalFooter, Form, ModalHeader, FormControl, FormGroup} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [username, setUsername] = useState({
        CourseName: "",
        FullName: "",
        FirstName: "",
        Profile_Image:""
    });
    const [showModal, setShowModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showImageModal, setShowImageModal] = useState(false);

    const [imagefile, setImageFile] = useState({
        profileimage: null
    }); //Image upload state

    const fileInputRef = useRef ()
    ;
    const [imageMsg,setImageMsg] = useState("") // Image Update Message

    const [msg, setMsg] = useState("");

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
            console.log(res.data[0]);
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
    const passwordChangeModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setMsg("");   // clear message
        //clear form fields
        setPasswordData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    };
    const handlePasswordChange = (e) => {
        setMsg("");   // remove old error while typing
        const name = e.target.name;
        const value = e.target.value;

        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.oldPassword === "" || passwordData.newPassword === "" || passwordData.confirmPassword === "") {
            setMsg("All fields are required");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMsg("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:9000/change-password",
                {
                    oldPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword
                },
                { withCredentials: true }
            );

            setMsg(res.data.message);
            setPasswordData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
            setTimeout(() => {
                setMsg("");
            }, 3000);
        } catch (err) {
            setMsg(err.response.data.message);
        }
    };
    const photoChangeModal=()=>{
        setShowImageModal(true);
    }
    const closeImageModal = () => {
        setShowImageModal(false);
        setImageMsg("");
        setImageFile({
            profileimage: null
        });
        //CLEARS FILE INPUT
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleImageChange=(e)=>{
        setImageMsg("");
        setImageFile({
            profileimage: e.target.files[0]
        });
    }
    const handleImageSubmit= async(e)=>{
        e.preventDefault();
        if(!imagefile.profileimage){
            setImageMsg("Select the image")
            return;
        }

        const imagedata = new FormData();
        imagedata.append("profile_image", imagefile.profileimage)
        try{
           const imgdata = await axios({
                url:"http://localhost:9000/update-image",
                method:"post",
                data:imagedata,
                withCredentials:true
            })
            setImageMsg(imgdata.data.message);

            //update imgage immediately without page refresh
            setUsername((prev) => ({
                ...prev,
                Profile_Image: imgdata.data.file
            }));
            fileInputRef.current.value = ""; // clear file input field
            setImageFile({
                profileimage: null
            });
            setTimeout(() => {
                setImageMsg("");
            }, 3000);
           
        }catch(err){
            setImageMsg("Error uploading image");
        }

    }
    
    return (
        <Container fluid className="p-0">

            <Row className="g-0">

                {/* LEFT SIDEBAR */}
                <Col md={2} className="bg-primary vh-100">

                    <div className="p-3">

                        {/* PROFILE */}
                        <div className="bg-light rounded text-center p-2  mb-2" >
                            <Image src={`http://localhost:9000/profile-image/${username.Profile_Image}`} roundedCircle width={70} height={70} alt="admin" className="d-block mx-auto"/>
                            <h6 className="mt-2 mb-0">{username.FullName}</h6>
                            <div style={{ fontSize: "13px" }}>{username.CourseName.split("(")[0]}</div>

                            <div className="d-flex justify-content-center gap-2 mt-2 mb-2">
                                <div>
                                    <Button size="sm" variant="warning" style={{fontSize: "11px"}} onClick={passwordChangeModal}>
                                        Change Password
                                    </Button>
                                    <Modal show={showModal} onHide={closeModal} backdrop="static">
                                        <ModalHeader closeButton>
                                            <ModalTitle>Change Password</ModalTitle>
                                        </ModalHeader>
                                        <Form onSubmit={handlePasswordSubmit}>
                                            <ModalBody>
                                                {msg && <p style={{ color: "red" }}>{msg}</p>}
                                                    <Form.Group className="mb-2">
                                                        <Form.Label>Old Password</Form.Label>
                                                        <Form.Control type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange}/>
                                                    </Form.Group>

                                                    <Form.Group className="mb-2">
                                                        <Form.Label>New Password</Form.Label>
                                                        <Form.Control type="password" name="newPassword"  value={passwordData.newPassword}  onChange={handlePasswordChange}/>
                                                    </Form.Group>

                                                    <Form.Group>
                                                        <Form.Label>Confirm Password</Form.Label>
                                                        <Form.Control type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange}/>
                                                    </Form.Group>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button variant="danger" onClick={closeModal}>
                                                    Cancel
                                                </Button>
                                                <Button variant="primary" type="submit">
                                                    Update
                                                </Button>
                                            </ModalFooter>
                                        </Form>
                                        
                                    </Modal>
                                </div>
                                <div>
                                    <Button size="sm"  variant="warning" style={{fontSize: "11px"}} onClick={photoChangeModal}>
                                        Change Photo
                                    </Button>
                                    <Modal onHide={closeImageModal} show={showImageModal} backdrop="static">
                                        <ModalHeader closeButton>
                                            <ModalTitle>Change Photo</ModalTitle>
                                        </ModalHeader>
                                        <Form onSubmit={handleImageSubmit}>
                                            
                                            <ModalBody>
                                                {imageMsg && <p style={{ color: "red" }}>{imageMsg}</p>}
                                                <FormGroup>
                                                    <FormControl type="file" ref={fileInputRef} name="profileimage"  onChange={handleImageChange}/>
                                                </FormGroup>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button variant="danger" onClick={closeImageModal}>
                                                    Cancel
                                                </Button>
                                                <Button variant="primary" type="submit">
                                                    Update
                                                </Button>
                                            </ModalFooter>
                                            
                                        </Form>
                                    </Modal>
                                </div>
                                
                            </div>
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