import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from './logo.png';
import axios from "axios";

const LoginComponent=()=>{

    const [forminput,setForminput] = useState({
        emailaddress:"",
        password:""
    })
    const [errormsg,setErrorMessage]=useState({});
    
    const navigate = useNavigate();

    useEffect(() => {
    axios.get("http://localhost:9000/verify", {
        withCredentials: true
    })
    .then(res => {
        if(res.status === 200){
            navigate("/dashboard");
        }
    })
    .catch(() => {
        // stay on login
    });
}, []);
    const handleInput=(e)=>{
        setForminput({
            ...forminput,
            [e.target.name]:e.target.value
        })
    }
    

    const Validate =()=>{
        let err = {};
        let Valid = true;
        // const emailRegex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

        if(!forminput.emailaddress){
            err.emailError = "Enter Your Email Address";
            Valid=false;
        }
        // else if(!emailRegex.test(forminput.emailaddress.trim())){
        //     err.emailError = "Invalid Email Address"
        //     Valid = false
        // }
        if(!forminput.password){
            err.passwordError = "Enter Password";
            Valid=false
        }
        // else if(!passwordRegex.test(forminput.password.trim())){
        //     err.passwordError = "Invaild Password";
        //     Valid=false
        // }
        setErrorMessage(err)
        return Valid;
    }

    const Formsubmit = async (e) => {
    e.preventDefault();

    if (Validate()) {
        try {
            const res = await axios({
                method: "POST",
                url: "http://localhost:9000/login",
                data: forminput,
                withCredentials: true
            });

            if (res.status === 200) {
                navigate("/dashboard");
            }

        } catch (err) {
            console.log(err);
        }
    }
};
    

    return(
        <div className="d-flex flex-column vh-100">
            <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="row justify-content-center w-100">
                    <div className="col-md-5">
                        <form onSubmit={Formsubmit}>
                            <div className="mb-3 d-flex justify-content-center">
                                <img src={logo} alt="CIIT Logo" width="150" height="80" className="img-fluid"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email Address: <span style={{"color":"red"}}>{errormsg.emailError}</span></label>
                                <input type="email" name="emailaddress" value={forminput.emailaddress} onChange={handleInput} className="form-control form-control-lg" placeholder="Enter your email address"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password: <span style={{"color":"red"}}>{errormsg.passwordError}</span></label>
                                <input type="password" name="password" value={forminput.password} onChange={handleInput} className="form-control form-control-lg" placeholder="Enter your password"/>
                            </div>

                            <div className="mb-4 d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" name="remember-me"/> 
                                        Remember me
                                    </label>
                                </div>
                                <Link to="" className="text-body">Forgot password?</Link>
                            </div>

                            <div>
                                <input type="submit" className="btn btn-primary btn-lg px-5" value="Login"/>
                                <p className="mt-2" style={{ fontWeight: 700 }}>
                                    Don't have an account? <Link to="/student-registration" className="link-danger">Register as a Guest</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            
            </div>
            <div className="bg-primary d-flex justify-content-between text-white" style={{padding:"20px"}}>
                <div>
                    Copyright @2026. All rights reserved.
                </div>
                <div>
                    <Link to="" className="text-decoration-none text-white">Employee Login</Link>
                </div>
                <div>
                    <Link to="" className="text-decoration-none text-white">Enquiry Form</Link>
                </div>
            </div>
            
        </div>
    )
}
export default LoginComponent;