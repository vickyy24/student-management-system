import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "react-bootstrap";

const Payment=()=>{
    const [payments, setPayments] = useState([])

    const fetchpayments = async()=>{
        try{
            const result = await axios({
                url:"http://localhost:9000/api/payment-details",
                method:"GET",
                withCredentials:true
            })
            setPayments(result.data)
        } catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        fetchpayments();
    }, []);
    return(
        <div>
            <Row >
                {payments.map((p, index) => (
                    <Col md={4} key={index}>
                        <Card className="shadow-lg p-3">
                            <CardBody>
                                <h6 className="text-end">
                                    {p.PaymentDate?.split("T")[0]}
                                </h6>
                                <Table borderless>
                                    <tbody>
                                        <tr>
                                            <td>Student Id :</td>
                                            <td>{p.StudentId}</td>
                                        </tr>
                                        <tr>
                                            <td>Payment amount :</td>
                                            <td>{p.PaymentAmount}</td>
                                        </tr>
                                        <tr>
                                            <td>Payment mode :</td>
                                            <td>{p.PaymentMode}</td>
                                        </tr>
                                        <tr>
                                            <td>Payment Desciption :</td>
                                            <td>{p.PaymentDescription}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" className="text-center">View Invoice</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>       
                        </Card>    
                    </Col>
                ))}
            </Row>
            
        </div>
    )
}
export default Payment;