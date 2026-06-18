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
        console.log('No user logged in');
      } else {
        console.log("user logged in: ", user);
        navigate("/");
      }
    } catch (error) {
      console.error('Error fetching user:', error);
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
        console.error('Sign in error:', error);
      } else {
        localStorage.setItem("userID", data.user.id);
        localStorage.setItem("email", email);
        navigate("/");
      }
    } else {
      alert("Please enter a valid email and password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-title">Welcome to MathSouls</div>
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