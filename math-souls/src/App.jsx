import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import QuestionPage from "./pages/QuestionPage";
import QuestionList from "./pages/QuestionList";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Gauntlet from "./pages/Gauntlet";
import Endless from "./pages/endless";
import SecretBenson from "./pages/SecretBenson";
import BossList from "./pages/BossList";
import RegisterConfirm from "./pages/RegisterConfirm";

function App() {
  const [auth, setAuth] = useState(false);
  // This state is here for the purpose of updating the navbar
  const [userUpdate, setUserUpdate] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("userID") == null) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
      {auth && <Navbar setAuth={setAuth} userUpdate={userUpdate} />}
      <Routes>
        <Route path="/" element={<Home setAuth={setAuth} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/list" element={<QuestionList />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/question/:category"
          element={<QuestionPage setUserUpdate={setUserUpdate} />}
        />
        <Route
          path="/gauntlet/:category"
          element={<Gauntlet setUserUpdate={setUserUpdate} />}
        />
        <Route path="/benson" element={<SecretBenson />} />
        <Route
          path="bossList"
          element={<BossList setUserUpdate={setUserUpdate} />}
        />
        <Route path="/RegisterConfirm" element={<RegisterConfirm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
