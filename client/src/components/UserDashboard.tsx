import React from "react";
import { recordClock } from "../api/usersApi";
import { Box } from "@mui/material";
import ClockButtons from "./ClockButtons";
import Clock from "./Clock";
import { toast } from "react-toastify";

const UserDashboard: React.FC = () => {
  const token = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  const recordClockHandler = async (username: string, type: "in" | "out") => {
    try {
      if (!username || !token) {
        throw new Error("Username is not available.");
      }
      // Call API to record clock-in or clock-out
      await recordClock(username, type, token);
      toast.success(`Successfully clocked ${type}!`, {
        position: "top-center",
        autoClose: 3000,
      });
      // Handle response or update UI as needed
    } catch (error) {
      console.error("Error recording clock:", error);
      // Show an error toast notification
      toast.error("Failed to record clock. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <Box sx={styles.Container}>
      <Clock />
      {username && (
        <Box sx={styles.ClockButtonsWrapper}>
          <ClockButtons username={username} recordClock={recordClockHandler} />
        </Box>
      )}
    </Box>
  );
};
const styles = {
  Container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    margin: "auto",
    borderRadius: 2,
    backgroundColor: "white",
    width: "100%",
    maxWidth: 500,
    minHeight: "auto",
  },
  ClockButtonsWrapper: {
    marginTop: 10, // Space between Clock and ClockButtons
  },
};

export default UserDashboard;
