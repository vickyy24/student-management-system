import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard=()=>{
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:9000/verify", {
            withCredentials: true
        })
        .catch(() =>
            navigate("/login-page")
        );
    }, [navigate]);
    return(
        <div>
            <h4>Dashboard Component</h4>
        </div>
    )
}
export default Dashboard;