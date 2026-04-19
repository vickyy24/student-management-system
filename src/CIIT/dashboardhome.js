import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

const DashboardHome = () => {
    const [showdata, setShowdata] = useState([])

    const fetchApi=async()=>{
        try{
            const res = await axios({
                method:"get",
                url:"http://localhost:9000/dashboard-details",
                withCredentials: true
            })
            setShowdata(res.data)
            console.log(res.data)
        }catch(err){
            if(err){
                console.log(err.response.data)
            }
        }
    }

    useEffect(()=>{
        fetchApi();
    },[])

    const cellStyle = {
        background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",
        color: "#000"
    };
    
    //Total Paid till date
    const feespaid = showdata.reduce((acc, curr) => acc + Number(curr.PaymentAmount),0);

    //fees status
    const getStatus = () => {
        let status = "";

        if (feespaid === 0) {
            status = "Unpaid";
        }
        else if (feespaid > 0 && feespaid < Math.floor(showdata[0].FinalFee)) {
            status = "Partial Paid";
        }
        else if (feespaid === Math.floor(showdata[0].FinalFee)) {
            status = "Paid";
        }

        return status;
    };

    let studentStatus = "";

    if (feespaid > 0) {
        studentStatus = "Valid";
    } else {
        studentStatus = "Invalid";
    }
    return (
        <div>
            {/* <h4>Dashboard Content</h4> */}
            <Row className="g-0">
                <Col md={6}>
                    <Container>
                        <h6>Course Details</h6>
                        <div className="shadow overflow-auto" style={{background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",height: "260px"}}>

                            <Table  bordered hover>
                                <thead>
                                    
                                </thead>
                                {showdata.map((row, index) => (
                                    <tbody key={index}>
                                        <tr>
                                            <td style={cellStyle}><b>Course:</b> {row.CourseName.split("(")[0]}</td>
                                            <td style={cellStyle}><b>Registration Date:</b> {row.RegistrationDate.split("T")[0]}</td>
                                        </tr>
                                        <tr>
                                            <td style={cellStyle}><b>Final Fees:</b> {Math.floor(row.FinalFee)}</td>
                                            <td style={cellStyle}><b>Student Status:</b> {studentStatus}</td>
                                        </tr>
                                        <tr>
                                            <td style={cellStyle}><b>Fees Paid: </b>{feespaid}</td>
                                            <td style={cellStyle}><b>Fees Remaining:</b> {Math.floor(row.FinalFee) - feespaid}</td>
                                        </tr>
                                        <tr>
                                            <td style={cellStyle}><b>Fees Status:</b> {getStatus()}</td>
                                            <td style={cellStyle}></td>
                                        </tr>
                                    </tbody>
                                ))}
                                
                            </Table>
                        </div>
                    </Container>
                </Col>
                <Col md={6}>
                    <Container>
                        <h6>Payment History</h6>
                        <div className="shadow  overflow-scroll" style={{background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",height: "260px"}}>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th style={cellStyle}>Sr. No.</th>
                                        <th style={cellStyle}>Payment Date</th>
                                        <th style={cellStyle}>Payment amount</th>
                                        <th style={cellStyle}>Payment Mode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showdata.map((row, index) => (
                                        <tr key={index}>
                                            <td style={cellStyle}>{index + 1}</td>
                                            <td style={cellStyle}>{row.PaymentDate.split("T")[0]}</td>
                                            <td style={cellStyle}>{Math.floor(row.PaymentAmount)}</td>
                                            <td style={cellStyle}>{row.PaymentMode}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td style={cellStyle}></td>
                                        <td style={cellStyle}></td>
                                        <td style={cellStyle}><b>Total Paid till date:</b></td>
                                        <td style={cellStyle}>
                                            {showdata.reduce(
                                                (acc, curr) => acc + Number(curr.PaymentAmount),0
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}
export default DashboardHome;