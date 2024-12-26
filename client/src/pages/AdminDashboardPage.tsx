import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import { Box, Typography, Paper } from "@mui/material";

const AdminDashboardPage: React.FC = () => {
  return (
    <Box sx={styles.Box}>
      <Paper sx={styles.Paper}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Admin Dashboard
        </Typography>
        <AdminDashboard />
      </Paper>
    </Box>
  );
};

const styles = {
  Box: {
    display: "flex",
    justifyContent: "center", // Centers horizontally
    alignItems: "center", // Centers vertically
    padding: 2,

    minHeight: "100vh",
  },
  Paper: {
    width: "100%",
    maxWidth: 1200,
    padding: 3,
    boxShadow: 3,
    marginBottom: 4,
    borderRadius: 2,
    backgroundColor: "white",
  },
};

export default AdminDashboardPage;
