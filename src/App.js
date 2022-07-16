import React from "react";

//router
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//components
import SignupLogin from "./components/SignupLogin";
import NavBar from "./components/NavBar";
import AdminWindow from "./components/AdminWindow";
import QuizGenerator from "./components/QuizGenerator";
import UserPage from "./components/UserPage";
import UserNavbar from "./components/UserPage/UserNavbar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <UserNavbar />
      <div style={{ margin: "20px" }}>
        <Routes>
          <Route path="/" element={<SignupLogin />} />
          <Route path="/adminWindow" element={<AdminWindow />} />
          <Route path="/quizGenerator" element={<QuizGenerator />} />
          <Route path="/takeQuiz" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
