import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionInput from '../components/QuestionInput';
import QuestionSubmit from '../components/QuestionSubmit';
import CorrectAnswer from '../components/CorrectAnswer';
import IncorrectAnswer from '../components/IncorrectAnswer';
import ButtonPressSound from '../assets/ButtonPress.mp3';
import './QuestionPage.css';
import { supabase } from '../supabase.js';

const QuestionPage = ({ setUserUpdate }) => {
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [algebraDefeated, setAlgebraDefeated] = useState(false);
  const [questionType, setQuestionType] = useState(null);
  const [question, setQuestion] = useState(''); // Added state for question
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    checkAlgebraDefeated();
    if (!algebraDefeated) {
      console.log("NOT DEFEATED");
    }
    const fetchQuestion = async () => {
      try {
            setQuestion('What is 2 + 2?');
    setCorrectAnswer(4);
    setQuestionType('Basic Math');
        const response = await axios.get('http://localhost:5173/question/', {
          params: { category: category || 'basic_math' },
        });
        console.log(response.data.problem);
        setQuestion(response.data.problem);
        setCorrectAnswer(parseInt(response.data.solution, 10));
        setQuestionType(response.data.type);
        console.log('Fetched Question:', question); // Log the fetched question
        console.log('Fetched Correct Answer:', response.data.solution);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };
    fetchQuestion();
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, [category]);

  const checkAlgebraDefeated = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const email = localStorage.getItem("email");
      const { data: userData, error: fetchError } = await supabase
        .from('Users')
        .select('algebraDefeated')
        .eq('email', email)
        .single();

      if (fetchError) throw fetchError;

      setAlgebraDefeated(userData.algebraDefeated);
    } catch (error) {
      console.error('Error fetching algebraDefeated status: ', error);
    }
  };

  const handleSubmit = async () => {
    const noWhiteSpaceLowerCase = userInput.replace(/\s+/g, '').toLowerCase();
    const userInputValue = parseInt(noWhiteSpaceLowerCase, 10);
    console.log("Submitted Answer:", userInputValue);
    console.log("Correct Answer:", correctAnswer);

    if (userInputValue === correctAnswer) {
      console.log("Correct");
      setIsCorrect(true);
      await updateSouls();
    } else {
      console.log("Incorrect");
      setIsCorrect(false);
    }
    
    const audio = new Audio(ButtonPressSound);
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });

    setSubmitDisabled(true);
  };

  const updateSouls = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const { data: userData, error: fetchError } = await supabase
        .from('Users')
        .select('souls')
        .eq('userID', userID)
        .single();

      if (fetchError) throw fetchError;

      const currentSouls = userData.souls;
      const newSoulsCount = parseInt(currentSouls) + 1;
      const { error: updateError } = await supabase
        .from('Users')
        .update({ souls: newSoulsCount })
        .eq('userID', userID);
      setUserUpdate(newSoulsCount);
      if (updateError) throw updateError;
    } catch (error) {
      console.error('Error updating souls:', error);
    }
  };

  const handleMoveToMenu = () => {
    setSubmitDisabled(false);
    navigate('/');
  };

  const handleContinueConquering = () => {
    setSubmitDisabled(false);
    window.location.reload();
  };

  return (
    <Container maxWidth="sm" className="full-height-center">
      <div className={`fade-in ${visible ? 'visible' : ''}`}>
        {/* Display the question */}
        <Typography variant="h6" align="center" gutterBottom color={'gray'} sx={{fontFamily: '"EB Garamond", serif', fontSize: "48px"}}>
          {question}
        </Typography>
        <QuestionInput userInput={userInput} setUserInput={setUserInput} />
        <Box display="flex" justifyContent="center" mt={2}>
          <QuestionSubmit handleSubmit={handleSubmit} disabled={submitDisabled} />
        </Box>
      </div>

      {isCorrect === true && <CorrectAnswer />}
      {isCorrect === false && <IncorrectAnswer />}
      {(isCorrect === true || isCorrect === false) && (
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleMoveToMenu}
            sx={{
              color: 'darkred',
              backgroundColor: 'gray',
              fontFamily: '"EB Garamond", serif'
            }}
          >
            Move to Menu
          </Button>
          <Button
            variant="contained"
            onClick={handleContinueConquering}
            sx={{
              color: 'darkred',
              backgroundColor: 'gray',
              fontFamily: '"EB Garamond", serif'
            }}
          >
            Continue Conquering
          </Button>
        </Box>
      )}
      
      <div 
        className={`fade-in ${visible ? 'visible' : ''}`}
        style={{
          fontSize: "16px",
          color: "gray",
          marginTop: "20px"
        }}
      >
        {questionType === "Combining Like Terms" && "Example answer: 10x+16x^2 (lower order terms first!)"}
        {questionType === "Expanding Polynomials" && "Example answer: 36x^2-12x (higher order terms first!)"}
        {questionType === "Linear Equations" && "Example answer: x,y or -5,-1"}
        {questionType === "System of Equations" && "Example answer: x,y or -5,-1"}
        {category === "geometry" && "Round TWO decimal places. Example: 12.43"}
      </div>
    </Container>
  );
};

export default QuestionPage;
