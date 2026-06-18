import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { supabase } from "../supabase";
import { knightPFP } from "../assets/index";
import "./Navbar.css";

const Navbar = ({ setAuth, userUpdate }) => {
  const [userData, setUserData] = useState({});
  const [toggleSignOut, setToggleSignOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [userUpdate]);

  const fetchUser = async () => {
    let { data: Users, error } = await supabase
      .from('Users')
      .select('*')
      .eq('email', localStorage.getItem("email"));

    if (error) {
      console.error('Error fetching user data:', error);
      return;
    }
    console.log("Fetched user data:", Users);
    setUserData(Users[0]);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-top-container">
        <div className="navbar-souls-container">Souls: {userData.souls}</div>
        <div className="username-pfp-container">
          <div>{userData.username}</div>
          <img
            src={knightPFP}
            alt="knightPFP"
            className="navbar-pfp"
            onClick={() => setToggleSignOut(!toggleSignOut)}
          />
        </div>
      </div>
      {toggleSignOut && (
        <div className="navbar-bottom-container">
          <div onClick={handleSignOut} className="navbar-signout-text">
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
