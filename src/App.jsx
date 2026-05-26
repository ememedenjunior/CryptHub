// App.js - Updated with routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HeroPage from "./pages/Heropage";
import UI from "./pages/UI";
import ProtectedRoute from "./components/Protect";
import UnProtectedRoute from "./components/NotProtect";
import ForgotPassword from "./pages/Password";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <UnProtectedRoute>
              <LoginPage />
            </UnProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <UnProtectedRoute>
              <SignUpPage />
            </UnProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <UnProtectedRoute>
              <HeroPage />
            </UnProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <UI />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <UnProtectedRoute>
              <ForgotPassword />
            </UnProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
