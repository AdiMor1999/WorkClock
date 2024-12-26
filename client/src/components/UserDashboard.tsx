import React from "react";
import { useAuth } from "../hooks/useAuth";
import { recordClock } from "../api/usersApi";

import ClockButtons from "./ClockButtons";
import Clock from "./Clock";

const UserDashboard: React.FC = () => {
  const { username, token } = useAuth();

  const recordClockHandler = async (username: string, type: "in" | "out") => {
    try {
      if (!username || !token) {
        throw new Error("Username is not available.");
      }
      // Call API to record clock-in or clock-out
      await recordClock(username, type, token);
      // Handle response or update UI as needed
    } catch (error) {
      console.error("Error recording clock:", error);
    }
  };

  return (
    <div>
      <Clock />
      {username && (
        <ClockButtons username={username} recordClock={recordClockHandler} />
      )}
    </div>
  );
};

export default UserDashboard;
