import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { supabase } from "../supabase";
import { buttonBackground } from "../assets/index";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user == null) {
        console.log("no user logged in");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    if (email != "" && password != "") {
      console.log(email, password);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        alert("Incorrect Email or Password");
      }
      localStorage.setItem("userID", data.user.id);

      navigate("/");
    } else {
      alert("Please enter a valid email and password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-title">You've Returned...</div>
      <div className="login-input-container">
        <input
          className="login-input-field"
          type="text"
          placeholder="Email..."
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="login-input-field"
          type="password"
          placeholder="Password..."
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>
        <img
          src={buttonBackground}
          alt="button"
          className="login-button-image"
        />
        <div className="login-button-text">Login</div>
      </button>
      <Link className="sign-up-link" to="/register">
        New around here?
      </Link>
    </div>
  );
};

export default Login;