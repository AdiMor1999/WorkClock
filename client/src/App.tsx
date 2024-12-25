import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: "#f8f9fa", // Light page background color
            fontFamily: "Roboto, sans-serif",
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          },
        }}
      />

      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
