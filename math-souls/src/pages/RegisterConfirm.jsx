import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const RegisterConfirm = () => {
  return (
    <div className="login-container">
      <div className="login-title">Registration Complete</div>
      <div className="register-confirm-message">
        A confirmation has been sent to your email new one...
      </div>
      <Link className="sign-up-link" to="/Login">
        Return to Login
      </Link>
    </div>
  );
};

export default RegisterConfirm;