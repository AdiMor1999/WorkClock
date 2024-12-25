import React, { useState } from "react";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import { loginUser } from "../api/authApi";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      onLoginSuccess();
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
            onChange={(e) => setUsername(e.target.value)}
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
