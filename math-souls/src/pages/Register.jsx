import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../supabase";
import { buttonBackground } from "../assets/index";
import "./Login.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (email.includes("@") == false) {
      alert("Invalid Email.");
      return;
    } if (password.length <= 5) {
      alert("Password must be at least 6 characters.");
      return;
    } 

    //Create user in auth and database
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
          data: {
            username: username,
        },
      },
    });

    // Insert user data into "Users" table
    const { data: Users, error: UsersError } = await supabase
      .from("Users")
      .insert([{username: username, email: email }]);


    if (UsersError) {
      console.error('Sign up error:', UsersError);
    } else {
      console.log('User created successfully:', data);
    }

    navigate("/RegisterConfirm");
  };

  return (
    <div className="login-container">
      <div className="login-title">Welcome, new one...</div>
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
        /><br />
        <input
          className="login-input-field"
          type="text"
          placeholder="Username..."
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleSignUp}>
        <img
          src={buttonBackground}
          alt="button"
          className="login-button-image"
        />
        <div className="login-button-text">Join</div>
      </button>
      <Link className="sign-up-link" to="/Login">
        Return to Login
      </Link>
    </div>
  );
};

export default Register;
