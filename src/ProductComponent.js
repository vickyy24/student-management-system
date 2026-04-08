import axios from "axios";
import { useRef } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap"

const ProductComponent = ()=>{

    const txtpname = useRef();
    const txtprate = useRef();
    const txtquantity = useRef();
    // const txtpimage = useRef();

    const addProduct=()=>{
        let pname = txtpname.current.value;
        let prate = txtprate.current.value;
        let pquantity = txtquantity.current.value;
        // let pimage = txtpimage.current.value

        let pdata ={ProductName:pname,Rate:prate,Quantity:pquantity}

        axios({
            url:"http://localhost:4000/products",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: pdata
        })
        .then((response)=>{
            alert(response.data.message);
            clearForm();
        });
    }
    const clearForm=()=>{
        txtpname.current.value="";
        txtprate.current.value="";
        txtquantity.current.value="";
        // txtpimage.current.value="";
    }
    return(
        <div className="container-fluid">
            {/* <Row>
                <col md={6}> */}
                
                <Form>
                    <FormGroup>
                        <FormLabel>Product Name:</FormLabel>
                        <FormControl type="text" ref={txtpname} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Rate:</FormLabel>
                        <FormControl type="text" ref={txtprate}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Quantity:</FormLabel>
                        <FormControl type="text" ref={txtquantity}/>
                    </FormGroup>
                    {/* <FormGroup>
                        <FormLabel>Product Image:</FormLabel>
                        <FormControl type="file" ref={txtpimage} name="productimage"/>
                    </FormGroup> */}
                    <Button variant="primary" onClick={addProduct}>
                        Submit
                    </Button>

                </Form>
                
                {/* </col>
            </Row> */}
        </div>
    )
}
export default ProductComponent;