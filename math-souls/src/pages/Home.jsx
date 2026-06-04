import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { buttonBackground } from "../assets";

const Home = ({ setAuth }) => {
  const greetingList = [
    "Greetings Traveler. There is much to be done.",
    "Welcome Traveler. A new day dawns.",
    "Still standing I see. Many await you.",
    "A good day to you. The day has just begun.",
  ];
  const secretGreeting = "Click me :)";

  const [greeting, setGreeting] = useState("");

  // hooks
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (localStorage.getItem("userID") == null) {
      // Redirect to login if not authenticated
      navigate("/login");
    } else {
      setAuth(true);

      // Selecting a random greeting
      setGreeting(greetingList[Math.floor(Math.random() * greetingList.length)]);
      if (Math.random() * 100 >= 99) {
        setGreeting(secretGreeting);
      }
    }
  }, [navigate]);

  function handleClick() {
    navigate("/question");
  }
  function toList() {
    navigate("/list");
  }
  function toSecret() {}

  return (
    <div className="homepage-container">
      if(greeting == secretGreeting){}
      <p className="titl">{greeting}</p>
      <div className="buttons">
        <a onClick={toList} className="image-container">
          <img
            src={buttonBackground}
            alt="Local Image"
            style={{ border: "none" }}
          />
          <div className="overlay-text">Tackle an enemy</div>
        </a>
        <a onClick={() => navigate("/bossList")} className="image-container">
          <img
            src={buttonBackground}
            alt="Local Image"
            style={{ border: "none" }}
          />
          <div className="overlay-text">Tackle the boss</div>
        </a>
      </div>
    </div>
  );
};

export default Home;
