// App.js - Updated with routing
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HeroPage from "./pages/Heropage";
import UI from "./pages/UI";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<HeroPage />} />
        <Route path="/home" element={<UI />} />
      </Routes>
    </Router>
  );
};

export default App;
