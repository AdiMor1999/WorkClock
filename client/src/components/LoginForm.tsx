import React, { useState } from "react";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {
        token,
        role,
        username: fetchedUsername,
      } = await loginUser(username, password);
      // Save the token for future API requests
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", fetchedUsername);

      // Navigate based on user role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "user") {
        navigate("/user-dashboard");
      } else {
        setError("Unknown role. Please contact support.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={styles.container}>
        <Typography variant="h4" component="h2">
          Please Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={styles.formMarginTop}
          />
          {error && <Typography sx={styles.errorText}>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
    marginTop: "10vh",
  },
  formMarginTop: {
    marginTop: "16px",
  },
  errorText: {
    color: "red",
  },
};

export default LoginForm;
