import React from "react";
import Signup from "../../Components/SignUp/";
import "react-toastify/dist/ReactToastify.css";
import "./index.style.scss";

const RegisterPage = () => {
  return (
    <div className="register">
      <div className="register__bg">
        <div className="register__container">
          <h2 className="logo">FaceBook Clone</h2>
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
