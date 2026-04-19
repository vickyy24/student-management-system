import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row, Alert } from "react-bootstrap";

const Profile=()=>{
    const [formData, setFormData] = useState({ 
        FirstName: "", LastName: "", Gender: "", EmailAddress: "", BirthDate: "", MobileNumber: "",
        WhatsappNumber: "", ParentName: "", ParentNumber: "", AadharNumber: "", LocalAddress: "", PermanentAddress: ""
    });
    const [qualificationList, setQualificationList] = useState([]);
    const [msg, setMsg] = useState("");

    const handleChange= (e)=>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    
    useEffect(()=>{
        fetchStudent();
    },[])
    const fetchStudent =async()=>{
        try{
            const student = await axios({
                method:"GET",
                url:"http://localhost:9000/student-details",
                withCredentials:true
            })
            if (student.data.length > 0) {
                setFormData(student.data[0]);
                
                //all qualifications
                const qList = student.data.map((item) =>(
                    item.QualificationName
                ))
                setQualificationList(qList);
            }
        }catch(err){
            console.log(err);
        }
    }
   
    const handleUpdate = async (e) => {
        e.preventDefault();

        const data = {
            fname: e.target.FirstName.value,
            lname: e.target.LastName.value,
            gender: e.target.Gender.value,
            email: e.target.EmailAddress.value,
            dob: e.target.BirthDate.value,
            mobile: e.target.MobileNumber.value,
            whatsapp: e.target.WhatsappNumber.value,
            parentName: e.target.ParentName.value,
            parentNumber: e.target.ParentNumber.value,
            aadhar: e.target.AadharNumber.value,
            localAddress: e.target.LocalAddress.value,
            permanentAddress: e.target.PermanentAddress.value
        };

        try {
            const res= await axios.put("http://localhost:9000/update-profile", data, {
                withCredentials: true
            });

            setMsg(res.data.message);

            // remove after few sec
            setTimeout(() => {
                setMsg("");
            }, 3000);

        } catch (err) {
            console.log(err);
            setMsg(err.response.data.message);

            setTimeout(() => {
                setMsg("");
            }, 3000);
        }
    };
    return(
        <div>

            <Container className="bg-light shadow p-4 position-relative">
                {msg && (
                    <Alert variant="warning" style={{position: "absolute", top: "-10px", padding: "5px 8px",left: "50%",
                            transform: "translateX(-50%)"}} className="text-center">
                        {msg}
                    </Alert>
                )}
                <h5 className="text-center">Profile Details</h5>
                <Form onSubmit={handleUpdate}>
                    <Row className="mb-2">
                        <Col>
                            <FormGroup>
                                <FormLabel>First Name:</FormLabel>
                                <FormControl type="text" name="FirstName" value={formData.FirstName} onChange={handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Last Name:</FormLabel>
                                <FormControl type="text" name="LastName" value={formData.LastName} onChange={handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Gender:</FormLabel>
                                <div className="d-flex">
                                <FormCheck  type="radio" label="Male" name="Gender" value="Male" checked={formData.Gender === "Male"} className="me-3" onChange={handleChange} />
                                <FormCheck  type="radio" label="Female" name="Gender" value="Female" checked={formData.Gender === "Female"} onChange={handleChange}/>
                                </div>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Qualification:</FormLabel>
                                {qualificationList.map((q, index) => (
                                    <FormControl key={index} value={q} readOnly />
                                ))}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <FormGroup>
                                <FormLabel>Email:</FormLabel>
                                <FormControl type="text" name="EmailAddress" value={formData.EmailAddress} onChange={handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Birthdate:</FormLabel>
                                <FormControl type="date" name="BirthDate" value={formData.BirthDate} onChange={handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Phone Number:</FormLabel>
                                <FormControl type="text" name="MobileNumber" value={formData.MobileNumber} onChange={handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Whatsapp Number:</FormLabel>
                                <FormControl type="text" name="WhatsappNumber" value={formData.WhatsappNumber} onChange={handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <FormGroup>
                                <FormLabel>Parent Name:</FormLabel>
                                <FormControl type="text" name="ParentName" value={formData.ParentName} onChange={handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Parent Number:</FormLabel>
                                <FormControl type="text" name="ParentNumber" value={formData.ParentNumber} onChange={handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Aadhar Number:</FormLabel>
                                <FormControl type="text" name="AadharNumber" value={formData.AadharNumber} onChange={handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <FormGroup>
                                <FormLabel>Local Address:</FormLabel>
                                <FormControl as="textarea" rows={2} name="LocalAddress" value={formData.LocalAddress} onChange={handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Perment address:</FormLabel>
                                <FormControl as="textarea" rows={2} name="PermanentAddress" value={formData.PermanentAddress} onChange={handleChange}/>
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    <Button type="submit" className="ms-auto d-block">Update</Button>
                </Form>
                
            </Container>
        </div>
    )
}
export default Profile;