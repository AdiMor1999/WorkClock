import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import UserDashboard from "../components/UserDashboard";

const UserDashboardPage: React.FC = () => {
  return (
    <Box sx={styles.Box}>
      <Paper sx={styles.Paper}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          User Dashboard
        </Typography>
        <UserDashboard />
      </Paper>
    </Box>
  );
};

const styles = {
  Box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    minHeight: "100vh",
  },
  Paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 3,
    boxShadow: 3,
    margin: "auto",
    borderRadius: 2,
    backgroundColor: "white",
    width: "100%",
    maxWidth: 1200,
    minHeight: "100vh",
  },
};

export default UserDashboardPage;
