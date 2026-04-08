import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginComponent from "./LoginComponent"
import RegistrationForm from "./StudentRegistration"
import Dashboard from "./DashboardComponent"
import Privacy from "./PrivacyComponent"

const MainComponent=()=>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginComponent/>}/>
                    <Route path="/login-page" element={<LoginComponent/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/student-registration" element={<RegistrationForm/>}>
                    <Route path="privacy-policy" element={<Privacy/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default MainComponent;