import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import MainOtp from './Nodemailer/MainOtp';
// import App from './Nodemailer/Registration';
// import { Mail } from './Nodemailer/SampleMailComponent';
// import MainCiit from './Forms/mainCiit';
import MainComponent from './CIIT/MainRouting';
// import Otp from './Nodemailer/Registerwithotp';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <MainCiit/> */}
    {/* <MasterRouting/> */}
    {/* <Employee/> */}
    {/* <Mail/> */}
    {/* <App/> */}
    {/* <MainOtp/> */}
    <MainComponent/>
  </React.StrictMode>
);