import React, { useState, useEffect } from "react";

//router
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//components
import SignupLogin from "./components/SignupLogin";
import Sidebar from "./components/Sidebar";
import AdminWindow from "./components/AdminWindow";
import QuizGenerator from "./components/QuizGenerator";

const App = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  return (
    <Router>
      <div style={{ minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ paddingLeft: width > 600 ? "255px" : "5px" }}>
          <Routes>
            <Route path="/" element={<SignupLogin />} />
            <Route path="/adminWindow" element={<AdminWindow />} />
            <Route path="/quizGenerator" element={<QuizGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
