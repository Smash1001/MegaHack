import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabase";
import { buttonBackground } from "../assets/index";
import "./Login.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    if (user.id != null) {
      navigate("/");
    }
  };

  const handleSignUp = async () => {
    if (email.includes("@") == false) {
      alert("Invalid Email.");
    } else if (password.length <= 5) {
      alert("Password must be at least 6 characters.");
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      const { data: Users, error: UsersError } = await supabase
        .from("Users")
        .insert([{ userID: data.user.id, username: username, email: email }])
        .select();

      localStorage.setItem("userID", data.user.id);

      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-title">Welcome, Traveler.</div>
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
    </div>
  );
};

export default Register;
