import React from "react";
import Signup from "../../Components/SignUp/SignUp.component";

import "./registerPage.style.scss";

const RegisterPage = () => {
  return (
    <div className="main-box">
      <h3 className="header">Facebook Clone</h3>
      <Signup />
    </div>
  );
};

export default RegisterPage;
