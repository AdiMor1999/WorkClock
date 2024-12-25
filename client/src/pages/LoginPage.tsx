import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/user-dashboard");
  };

  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
