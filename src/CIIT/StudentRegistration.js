import { Button, Card, CardBody, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Nav, Navbar, NavbarBrand, NavLink, Row, Table, Toast, ToastBody, ToastContainer } from "react-bootstrap";
import logo from './logo.png';
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationForm = ()=>{

    const [profileData, setProfiledata] = useState({branch_name: "",registration_date: "",first_name: "",last_name: "",gender: "",birth_date: "",email_address: "",
        mobile_number: "",whatsapp_number: "",parent_name: "",parent_number: "",aadhar_number: "",aadhar_image: "",local_address: "",permanent_address: ""
    });

    const [qualificationData, setQualificationdata] = useState({qualification_name: "",university_name: "",passing_year: "",medium: "",percentage: ""});

    const [registrationData, setRegistrationdata] = useState({course: "",fee_amount: "",gst: "",total_fee: "",discount: "",final_fee: ""});
    
    const [paymentData, setPaymentdata] = useState({payment_date: "",payment_amount: "",payment_mode: "",payment_description: ""});

    const [qualificationList, setQualificationList] = useState([]);
    const [coursesdd, setCoursesdd] = useState([]);
    const [errors, setErrors] = useState({});
    const [serversideMsg,setServersidemsg] = useState("")
    const fileRef = useRef(null);
    const navigate = useNavigate();

    const branchOptions = [{ id: 1, name: "Baramati" },{ id: 2, name: "Hadapsar" },{ id: 3, name: "Viman Nagar" }];

    const qualificationOptions =[
        {id:1,name:"BA"},{id:2,name:"BBA"},{id:3,name:"BCA"},{id:4,name:"BCOM"},{id:5,name:"BE"},{id:6,name:"BFarm"},{id:7,name:"BHMS"},
        {id:8,name:"BSC"},{id:9,name:"Btech"},{id:10,name:"MA"},{id:11,name:"Graducation"},{id:12,name:"MBA"},{id:13,name:"MBBS"},
        {id:14,name:"MCA"},{id:15,name:"MCOM"},{id:16,name:"ME"},{id:17,name:"MSC"},{id:18,name:"Mtech"}
    ]
    const fetchCourses = async () => {
        try {
        const response = await axios({
            method: "get",
            url: "http://localhost:9000/coursesdd"
        });
        setCoursesdd(response.data);

        } catch (error) {
        console.log("Error fetching courses:", error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfiledata({
            ...profileData,
            [name]: value
        });
        // clear error for that field
        setErrors({
            ...errors,
            [name]: ""
        });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfiledata({
            ...profileData,
            aadhar_image: file
        });
        setErrors({
            ...errors,
            aadhar_image: ""
        });
    };
    const handleQualificationChange = (e) => {
        const { name, value } = e.target;
        setQualificationdata({
            ...qualificationData,
            [name]: value
        });
        // clear error
        setErrors({
            ...errors,
            [name]: ""
        });
    };
    
    const handleRegistrationChange = (e) => {
        const { name, value } = e.target;

        if (name === "course") {
            const selectedCourse = coursesdd.find(c => c.course_name === value);

            if (selectedCourse) {
                const total = Math.round(Number(selectedCourse.fees_amount) + Number(selectedCourse.fees_amount * selectedCourse.gst_percentage / 100));

                setRegistrationdata({
                    ...registrationData,
                    course: value,
                    fee_amount: Number(selectedCourse.fees_amount),
                    gst: Number(selectedCourse.gst_percentage),
                    total_fee: total
                });
            }
        }
        else if (name === "discount") {
            setRegistrationdata({
            ...registrationData,
            discount: value,
            final_fee: registrationData.total_fee - Number(value)
            });
        } 
        else {
            setRegistrationdata({
            ...registrationData,
            [name]: value
            });
        }
        setErrors({
            ...errors,
            [name]: ""
        });
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentdata({
            ...paymentData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ""
        });
    };
    const Validate =()=>{
        let err={};
        let isValid = true;
        const nameRegex = /^[A-Za-z]+([ .'-][A-Za-z]+)*$/;
        const emailRegex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        const mobileRegex = /^[0-9]{10}$/;
        const aadharRegex = /^[0-9]{12}$/;
        
        // ----------profile----------
        if (!profileData.branch_name) {
            err.branch_name = "Branch is required";
            isValid = false;
        }
        if (!profileData.registration_date) {
            err.registration_date = "Registration date is required";
            isValid = false;
        }
        if (!profileData.first_name.trim()) {
            err.first_name = "First name is required";
            isValid = false;
        } else if (!nameRegex.test(profileData.first_name.trim())) {
            err.first_name = "Only letters allowed";
            isValid = false;
        }
        if (!profileData.last_name.trim()) {
            err.last_name = "Last name is required";
            isValid = false;
        } else if (!nameRegex.test(profileData.last_name.trim())) {
            err.last_name = "Only letters allowed";
            isValid = false;
        }
        if (!profileData.gender) {
            err.gender = "Gender is required";
            isValid = false;
        }
        if (!profileData.birth_date) {
            err.birth_date = "Birthdate is required";
            isValid = false;
        }
        if (!profileData.email_address.trim()) {
            err.email_address = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(profileData.email_address.trim())) {
            err.email_address = "Invalid email format";
            isValid = false;
        }
        if (!profileData.mobile_number.trim()) {
            err.mobile_number = "Mobile number is required";
            isValid = false;
        } else if (!mobileRegex.test(profileData.mobile_number.trim())) {
            err.mobile_number = "Mobile must be 10 digits";
            isValid = false;
        }
        if (!profileData.whatsapp_number.trim()) {
            err.whatsapp_number = "WhatsApp number is required";
            isValid = false;
        } else if (!mobileRegex.test(profileData.whatsapp_number.trim())) {
            err.whatsapp_number = "Invalid WhatsApp number";
            isValid = false;
        }
        if (!profileData.parent_name.trim()) {
            err.parent_name = "Parent name is required";
            isValid = false;
        } else if (!nameRegex.test(profileData.parent_name.trim())) {
            err.parent_name = "Only letters allowed";
            isValid = false;
        }
        if (!profileData.parent_number.trim()) {
            err.parent_number = "Parent number is required";
            isValid = false;
        } else if (!mobileRegex.test(profileData.parent_number.trim())) {
            err.parent_number = "Invalid parent number";
            isValid = false;
        }
        if (!profileData.aadhar_number.trim()) {
            err.aadhar_number = "Aadhar number is required";
            isValid = false;
        } else if (!aadharRegex.test(profileData.aadhar_number.trim())) {
            err.aadhar_number = "Aadhar must be 12 digits";
            isValid = false;
        }
        if (!profileData.aadhar_image) {
            err.aadhar_image = "Aadhar image is required";
            isValid = false;
        }
        if (!profileData.local_address.trim()) {
            err.local_address = "Local address is required";
            isValid = false;
        }

        if (!profileData.permanent_address.trim()) {
            err.permanent_address = "Permanent address is required";
            isValid = false;
        }
        //---------qualification-------
        
        //if user dont add data in table(+button click)
        if (qualificationList.length === 0) {

            //show error at +button
            err.qualificationlist = "Add Data";
            isValid = false;

            //if user dont give input
            if (!qualificationData.qualification_name) {
                err.qualification_name = "Qualification is required";
                isValid = false;
            }

            if (!qualificationData.university_name.trim()) {
                err.university_name = "University is required";
                isValid = false;
            }
            if (!qualificationData.passing_year.trim()) {
                err.passing_year = "Year is required";
                isValid = false;
            }
            else if (!/^[0-9]+$/.test(qualificationData.passing_year.trim())) {
                err.passing_year = "Year must contain only numbers";
                isValid = false;
            }
            if (!qualificationData.medium.trim()) {
                err.medium = "Medium is required";
                isValid = false;
            }
        
            if (!qualificationData.percentage.trim()) {
                err.percentage = "Percentage is required";
                isValid = false;
            }
            else if (!/^[0-9]+$/.test(qualificationData.percentage.trim())) {
                err.percentage = "Percentage must contain only numbers";
                isValid = false;
            }
        }
        
        //----------Registration----------
        if (!registrationData.course) {
            err.course = "Course is required";
            isValid = false;
        }
        if (!registrationData.discount.trim()) {
            err.discount = "Discount is required";
            isValid = false;
        } else if (!/^[0-9]+$/.test(registrationData.discount.trim())) {
            err.discount = "Discount must be a number";
            isValid = false;
        }
        //-------payment--------
        if (!paymentData.payment_date) {
            err.payment_date = "Payment date is required";
            isValid = false;
        }

        if (!paymentData.payment_amount.trim()) {
            err.payment_amount = "Payment amount is required";
            isValid = false;
        } else if (!/^[0-9]+$/.test(paymentData.payment_amount.trim())) {
            err.payment_amount = "Payment amount must be a number";
            isValid = false;
        }

        if (!paymentData.payment_mode.trim()) {
            err.payment_mode = "Payment mode is required";
            isValid = false;
        }
        if (!paymentData.payment_description.trim()) {
            err.payment_description = "Payment description is required";
            isValid = false;
        }
        setErrors(err);
        return isValid;
    }
    const qualificationValidate =()=>{

        const err = {}
        let isValid = true;
        //---------qualification-------
        if (!qualificationData.qualification_name) {
            err.qualification_name = "Qualification is required";
            isValid = false;
        }

        if (!qualificationData.university_name.trim()) {
            err.university_name = "University is required";
            isValid = false;
        }

        if (!qualificationData.passing_year.trim()) {
            err.passing_year = "Year is required";
            isValid = false;
        }
        else if (!/^[0-9]+$/.test(qualificationData.passing_year.trim())) {
            err.passing_year = "Year must contain only numbers";
            isValid = false;
        }
        if (!qualificationData.medium.trim()) {
            err.medium = "Medium is required";
            isValid = false;
        }
      
        if (!qualificationData.percentage.trim()) {
            err.percentage = "Percentage is required";
            isValid = false;
        }
        else if (!/^[0-9]+$/.test(qualificationData.percentage.trim())) {
            err.percentage = "Percentage must contain only numbers";
            isValid = false;
        }
        setErrors({
            ...errors,
            ...err
        });
        return isValid;
    }
    const addQualification=()=>{

        if(qualificationValidate()){
            setQualificationList([
                ...qualificationList,
                qualificationData
            ]);

            // clear fields
            setQualificationdata({
                qualification_name: "",
                university_name: "",
                passing_year: "",
                medium: "",
                percentage: ""
            });
            setErrors({
                ...errors,
                qualificationlist: ""
            });
        }
        

    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(Validate()){
            // console.log("Form submitted");
            const studentdata = new FormData();
            
            //Profiledata
            studentdata.append("branch",profileData.branch_name);
            studentdata.append("registrationdate",profileData.registration_date);
            studentdata.append("firstname",profileData.first_name);
            studentdata.append("lastname",profileData.last_name);
            studentdata.append("gender",profileData.gender);
            studentdata.append("birthdate",profileData.birth_date);
            studentdata.append("emailaddress",profileData.email_address);
            studentdata.append("mobilenumber", profileData.mobile_number);
            studentdata.append("whatsappnumber",profileData.whatsapp_number);
            studentdata.append("parentname",profileData.parent_name);
            studentdata.append("parentnumber",profileData.parent_number);
            studentdata.append("aadharnumber",profileData.aadhar_number);
            studentdata.append("aadharimage",profileData.aadhar_image);
            studentdata.append("localaddress",profileData.local_address);
            studentdata.append("permanentaddress",profileData.permanent_address);
            studentdata.append("qualificationList",JSON.stringify(qualificationList))
            //Registrationdata
            studentdata.append("coursename",registrationData.course);
            studentdata.append("feeamount",registrationData.fee_amount);
            studentdata.append("gst",registrationData.gst);
            studentdata.append("totalfee",registrationData.total_fee);
            studentdata.append("discount",registrationData.discount);
            studentdata.append("finalfee",registrationData.final_fee)
            //Paymentdata
            studentdata.append("paymentdate",paymentData.payment_date);
            studentdata.append("paymentamount",paymentData.payment_amount);
            studentdata.append("paymentmode",paymentData.payment_mode);
            studentdata.append("paymentdescription",paymentData.payment_description);

            try{
                const res = await axios({
                    method:"POST",
                    url:"http://localhost:9000/register",
                    data:studentdata
                })
                if (res.status === 200) {
                    setServersidemsg("S:" + res.data.message);

                    // clear file input
                    fileRef.current.value = "";
                    // Profile
                    setProfiledata({
                        branch_name: "",
                        registration_date: "",
                        first_name: "",
                        last_name: "",
                        gender: "",
                        birth_date: "",
                        email_address: "",
                        mobile_number: "",
                        whatsapp_number: "",
                        parent_name: "",
                        parent_number: "",
                        aadhar_number: "",
                        // aadhar_image: "",
                        local_address: "",
                        permanent_address: ""
                    });

                    //clear table
                    setQualificationList([]);

                    // Registration
                    setRegistrationdata({
                        course: "",
                        fee_amount: "",
                        gst: "",
                        total_fee: "",
                        discount: "",
                        final_fee: ""
                    });

                    // Payment
                    setPaymentdata({
                        payment_date: "",
                        payment_amount: "",
                        payment_mode: "",
                        payment_description: ""
                    });

                    // Errors
                    setErrors({});

                    //after successfull submit redirect to login page
                    setTimeout(() => {
                        setServersidemsg("");
                        navigate("/login-page");
                    }, 3000);
                }
                setTimeout(() => {
                    setServersidemsg("");
                }, 3000);
            
            }catch(err){
                if (err.response.status === 500) {
                    setServersidemsg("E:" + err.response.data.message);
                } else {
                    setServersidemsg("E:Something went wrong");
                }
                setTimeout(()=>{
                    setServersidemsg("")
                },3000)
            }
            
        }
        
    };
    return(
        <div>
            <ToastContainer position="top-center" className="p-3" style={{ zIndex: 9999 }}>
                {serversideMsg && (
                    <Toast bg={serversideMsg.startsWith("S:") ? "success" : "danger"}>
                        <ToastBody className="text-white text-center">
                            {serversideMsg.substring(2)}
                        </ToastBody>
                    </Toast>
                )}
            </ToastContainer>
            <Navbar className="bg-body-secondary border-bottom border-2 shadow-sm mb-3">
                <Container fluid>
                    <NavbarBrand>
                        <img src={logo} width="140" height="70" className="" alt="Ciit logo"/>
                    </NavbarBrand>
                    <Nav className="me-auto">
                        <NavLink href="privacy-policy">Privacy</NavLink>
                        <NavLink href="#secure">Secure</NavLink>
                        <NavLink href="#nonsecure">Non Secure</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink href="#register">Register</NavLink>
                        <NavLink href="#login">Login</NavLink>
                    </Nav>
                </Container>
                
            </Navbar>
            <Container fluid>
                <Row className="mb-1">
                    <Col className="text-center">
                        <h5>Student Registration Form</h5>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={9}>  
                        <Card className="shadow-sm">                            
                            <CardBody>
                                
                                <Form onSubmit={handleSubmit}>

                                    {/* Profile Section */}
                                    <h6 className="text-danger mb-3">Student Profile Details</h6>
                                    <Row className="mb-3">
                                        <Col md={4}>
                                            <FormGroup>
                                                <FormLabel>Select Branch:</FormLabel>
                                                <FormSelect name="branch_name" value={profileData.branch_name} onChange={handleProfileChange} isInvalid={!!errors.branch_name}>
                                                    <option value="">Select Branch</option>
                                                    {branchOptions.map((row,index)=>(
                                                        <option key={row.id} value={row.id}>
                                                            {row.name}
                                                        </option>
                                                    ))}
                                                </FormSelect>
                                                <Form.Control.Feedback type="invalid">{errors.branch_name}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4} className="ms-auto">
                                            <FormGroup>
                                                <FormLabel>Registration Date:</FormLabel>
                                                <FormControl type="date" name="registration_date" value={profileData.registration_date} onChange={handleProfileChange} isInvalid={!!errors.registration_date}/>
                                                <Form.Control.Feedback type="invalid">{errors.registration_date}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={4}>
                                            <FormGroup>
                                                <FormLabel>First Name:</FormLabel>
                                                <FormControl name="first_name" value={profileData.first_name} onChange={handleProfileChange} isInvalid={!!errors.first_name}/>
                                                <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <FormLabel>Last Name:</FormLabel>
                                                <FormControl name="last_name" value={profileData.last_name} onChange={handleProfileChange} isInvalid={!!errors.last_name}/>
                                                <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormLabel>Gender:</FormLabel><br />
                                            <FormCheck inline type="radio" label="Male" name="gender" value="Male" checked={profileData.gender === "Male"} onChange={handleProfileChange}/>
                                            <FormCheck inline type="radio" label="Female" name="gender" value="Female" checked={profileData.gender === "Female"} onChange={handleProfileChange}/>
                                            {errors.gender && (<span style={{ color: "red", fontSize: "14px" }}> {errors.gender}</span>)}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={3}>
                                            <FormGroup>
                                                <FormLabel>Birth Date:</FormLabel>
                                                <FormControl type="date" name="birth_date" value={profileData.birth_date} onChange={handleProfileChange} isInvalid={!!errors.birth_date}/>
                                                <Form.Control.Feedback type="invalid">{errors.birth_date}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <FormLabel>Email:</FormLabel>
                                                <FormControl type="email" name="email_address" value={profileData.email_address} onChange={handleProfileChange} isInvalid={!!errors.email_address}/>
                                                <Form.Control.Feedback type="invalid">{errors.email_address}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <FormLabel>Mobile Number:</FormLabel>
                                                <FormControl type="text" name="mobile_number" value={profileData.mobile_number} onChange={handleProfileChange} isInvalid={!!errors.mobile_number}/>
                                                <Form.Control.Feedback type="invalid">{errors.mobile_number}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <FormLabel>Whatsapp Number:</FormLabel>
                                                <FormControl type="text" name="whatsapp_number" value={profileData.whatsapp_number} onChange={handleProfileChange} isInvalid={!!errors.whatsapp_number}/>
                                                <Form.Control.Feedback type="invalid">{errors.whatsapp_number}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={3}>
                                            <FormGroup>
                                                <FormLabel>Parent Name:</FormLabel>
                                                <FormControl type="text" name="parent_name" value={profileData.parent_name} onChange={handleProfileChange} isInvalid={!!errors.parent_name}/>
                                                <Form.Control.Feedback type="invalid">{errors.parent_name}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <FormLabel>Parent Number</FormLabel>
                                                <FormControl type="text" name="parent_number" value={profileData.parent_number} onChange={handleProfileChange} isInvalid={!!errors.parent_number}/>
                                                <Form.Control.Feedback type="invalid">{errors.parent_number}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <FormLabel>Aadhar Card Number:</FormLabel>
                                                <FormControl type="text" name="aadhar_number" value={profileData.aadhar_number} onChange={handleProfileChange} isInvalid={!!errors.aadhar_number}/>
                                                <Form.Control.Feedback type="invalid">{errors.aadhar_number}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <FormLabel>Aadhar Card Photo</FormLabel>
                                                <FormControl type="file" name="aadhar_image"  onChange={handleFileChange} isInvalid={!!errors.aadhar_image} ref={fileRef}/>
                                                <Form.Control.Feedback type="invalid">{errors.aadhar_image}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <FormGroup>
                                                <FormLabel>Local Address:</FormLabel>
                                                <FormControl as="textarea" rows={2} name="local_address" value={profileData.local_address} onChange={handleProfileChange} isInvalid={!!errors.local_address}/>
                                                <Form.Control.Feedback type="invalid">{errors.local_address}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Permanent Address:</Form.Label>
                                                <Form.Control as="textarea" rows={2} name="permanent_address" value={profileData.permanent_address} onChange={handleProfileChange} isInvalid={!!errors.permanent_address}/>
                                                <Form.Control.Feedback type="invalid">{errors.permanent_address}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <hr />

                                    {/* Qualification Section */}
                                    <h6 className="text-danger mb-3">Student Qualification</h6>
                                    <Row className="mb-3">
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Qualification</Form.Label>
                                                <Form.Select name="qualification_name" value={qualificationData.qualification_name} onChange={handleQualificationChange} isInvalid={!!errors.qualification_name}>
                                                <option value="">Select Qualification</option>
                                                {qualificationOptions.map((row,index)=>(
                                                    <option key={row.id} value={row.name}>{row.name}</option>
                                                ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">{errors.qualification_name}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>University</Form.Label>
                                            <Form.Control name="university_name" value={qualificationData.university_name} onChange={handleQualificationChange} isInvalid={!!errors.university_name}/>
                                            <Form.Control.Feedback type="invalid">{errors.university_name}</Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>Year</Form.Label>
                                            <Form.Control name="passing_year" value={qualificationData.passing_year} onChange={handleQualificationChange} isInvalid={!!errors.passing_year}/>
                                            <Form.Control.Feedback type="invalid">{errors.passing_year}</Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>Medium</Form.Label>
                                            <Form.Control name="medium" value={qualificationData.medium} onChange={handleQualificationChange} isInvalid={!!errors.medium}/>
                                            <Form.Control.Feedback type="invalid">{errors.medium}</Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>Percentage</Form.Label>
                                            <Form.Control name="percentage" value={qualificationData.percentage} onChange={handleQualificationChange} isInvalid={!!errors.percentage}/>
                                            <Form.Control.Feedback type="invalid">{errors.percentage}</Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                        <Col md={1} >
                                            <FormGroup>
                                                
                                                <Button className="w-100" onClick={addQualification}>+</Button>

                                                {errors.qualificationlist && (
                                                    <div className="invalid-feedback d-block text-center">
                                                        {errors.qualificationlist}
                                                    </div>
                                                )}

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>
                                                <th>Qualification</th>
                                                <th>University</th>
                                                <th>Year</th>
                                                <th>Medium</th>
                                                <th>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                             {qualificationList.map((q, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{q.qualification_name}</td>
                                                    <td>{q.university_name}</td>
                                                    <td>{q.passing_year}</td>
                                                    <td>{q.medium}</td>
                                                    <td>{q.percentage}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>

                                    <hr/>
                                    {/* Registration Details Section */}
                                    <h6 className="text-danger mb-3">Registration Details</h6>
                                    <Row className="mb-3">
                                        <Col md={4}>
                                            <FormGroup>
                                                <FormLabel>Select Course:</FormLabel>
                                                <FormSelect name="course" value={registrationData.course} onChange={handleRegistrationChange} isInvalid={!!errors.course}>
                                                    <option value="">Select Course</option>
                                                    {coursesdd.map((dd,index)=>(
                                                        <option key={dd.course_id} value={dd.course_name}>{dd.course_name}</option>
                                                    ))}
                                                </FormSelect>
                                                <Form.Control.Feedback type="invalid">{errors.course}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                            <FormLabel>Fees Amount:</FormLabel>
                                            <FormControl type="text" name="fee_amount" value={registrationData.fee_amount} onChange={handleRegistrationChange} disabled/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                            <FormLabel>GST:</FormLabel>
                                            <FormControl type="text" name="gst" value={registrationData.gst} onChange={handleRegistrationChange} disabled/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <FormLabel>Total Fees:</FormLabel>
                                                <FormControl name="total_fee" value={registrationData.total_fee} onChange={handleRegistrationChange } disabled/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                            <FormLabel>Discount:</FormLabel>
                                            <FormControl type="text" name="discount" value={registrationData.discount} onChange={handleRegistrationChange } isInvalid={!!errors.discount}/>
                                            <Form.Control.Feedback type="invalid">{errors.discount}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                            <FormLabel>Final Fees:</FormLabel>
                                            <FormControl type="text" name="final_fee" value={registrationData.final_fee} onChange={handleRegistrationChange } disabled/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <hr/>

                                    {/* Payment Details Section */}
                                    <h6 className="text-danger mb-3">Payment Details</h6>
                                    <Row>
                                        <Col md={3}>
                                            <FormGroup>
                                            <FormLabel>Payment Date</FormLabel>
                                            <FormControl type="date" name="payment_date" value={paymentData.payment_date} onChange={handlePaymentChange } isInvalid={!!errors.payment_date}/>
                                            <Form.Control.Feedback type="invalid">{errors.payment_date}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                            <FormLabel>Payment Amount</FormLabel>
                                            <FormControl type="text" name="payment_amount" value={paymentData.payment_amount} onChange={handlePaymentChange } isInvalid={!!errors.payment_amount}/>
                                            <Form.Control.Feedback type="invalid">{errors.payment_amount}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                            <FormLabel>Payment Mode</FormLabel>
                                            <FormControl type="text" name="payment_mode" value={paymentData.payment_mode} onChange={handlePaymentChange } isInvalid={!!errors.payment_mode}/>
                                            <Form.Control.Feedback type="invalid">{errors.payment_mode}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                            <FormLabel>Payment Description</FormLabel>
                                            <FormControl type="text" name="payment_description" value={paymentData.payment_description} onChange={handlePaymentChange } isInvalid={!!errors.payment_description}/>
                                            <Form.Control.Feedback type="invalid">{errors.payment_description}</Form.Control.Feedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button type="submit" className="w-100 mt-4">Submit</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    
                </Row>
                <div>
                    <Row>
                        <Col className="mt-3 bg-body-secondary border-top border-2 shadow-sm">
                            <p>© 2026 - CoreIdentityExample - <Link to="privacy-policy" >Privacy</Link></p>
                        </Col>
                    </Row>
                </div>
            </Container>
            
        </div>
    )
}
export default RegistrationForm;