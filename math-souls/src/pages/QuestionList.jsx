import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buttonBackground } from "../assets";
import { supabase } from "../supabase.js";

const QuestionList = () => {
  const [souls, setSouls] = useState(0); // Initialize souls with a default value
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchSouls = async ()=> { try {
    const userID = localStorage.getItem("userID");
    const email = localStorage.getItem("email");
    if (!userID) throw new Error ("No User ID");
  
    const {data, error}= await supabase
      .from('Users')
      .select('souls')
      .eq('email', email)
      .single();
    setSouls(data.souls);
    }
    catch(error){
      console.error("Error fetching souls:", error)
    }}   
    fetchSouls();
  },[]);
  
  // Function to handle navigation based on the category
  function handleClick(category) {
    if (category === "basic_math" || category === "algebra" || category === "geometry") {
      navigate(`/question/${category}`);
    }
  }

  function backMenu() {
    navigate("/");
  }

  return (
    <div className="homepage-container">
      <p className="titl">Choose your fate.</p>
      <div className="buttons">
        <div className="button-underlyingtext-container">
          <a
            onClick={() => handleClick("basic_math")}
            className="image-container"
          >
            <img
              src={buttonBackground}
              alt="Basic Math"
              style={{ border: "none" }}
            />
            <div className="overlay-text">Basic math</div>
          </a>
          <div className="underlying-text">Test yourself.</div>
        </div>
        <div>
          <a
            onClick={() => {
              if (souls >= 200) handleClick("algebra");
            }}
            className="image-container"
          >
            <img
              src={buttonBackground}
              alt="Algebra"
              style={{ opacity: souls >= 200 ? 1 : 0.3 }}
            />
            <div className="overlay-text">Algebra</div>
          </a>
          {souls < 200 && (
            <div className="underlying-text">Souls needed: 200</div>
          )}
        </div>
        <div>
          <a
            onClick={() => {
              if (souls >= 600) handleClick("geometry");
            }}
            className="image-container"
          >
            <img
              src={buttonBackground}
              alt="geometry"
              style={{ opacity: souls >= 600 ? 1 : 0.3 }}
            />
            <div className="overlay-text">Geometry</div>
          </a>
          {souls < 600 && (
            <div className="underlying-text">Souls needed: 600</div>
          )}
        </div>
      </div>
      <div className="backButton-text-container">
        <a onClick={backMenu}>
          <div className="backButton-text">Return to menu</div>
        </a>
      </div>
    </div>
  );
};

export default QuestionList;
