import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginComponent from "./CIIT/LoginComponent"
import RegistrationForm from "./CIIT/StudentRegistration"
import Dashboard from "./CIIT/Dashboard"
import Privacy from "./CIIT/PrivacyComponent"
import Profile from "./CIIT/profile"
import Batches from "./CIIT/batches"
import Payment from "./CIIT/payment"
import PracticeExams from "./CIIT/practiceexams"
import Videotut from "./CIIT/videotutorial"
import DashboardHome from "./CIIT/dashboardhome"

const MainComponent=()=>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginComponent/>}/>
                    <Route path="/login-page" element={<LoginComponent/>}/>
                    
                    <Route path="/dashboard" element={<Dashboard />}>

                        {/* default dashboard content */}
                        <Route index element={<DashboardHome />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="batches" element={<Batches />} />
                        <Route path="payments" element={<Payment />} />
                        <Route path="practice-exams" element={<PracticeExams />} />

                        <Route path="video-tutorial" element={<Videotut />} />

                    </Route>
                    <Route path="/student-registration" element={<RegistrationForm/>}>
                        <Route path="privacy-policy" element={<Privacy/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default MainComponent;