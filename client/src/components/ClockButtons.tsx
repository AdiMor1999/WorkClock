import React, { useState } from "react";
import { Button } from "@mui/material";

interface ClockButtonsProps {
  username: string;
  recordClock: (username: string, type: "in" | "out") => void;
}

const ClockButtons: React.FC<ClockButtonsProps> = ({
  username,
  recordClock,
}) => {
  const [isClockedIn, setIsClockedIn] = useState(false);

  const handleClick = () => {
    if (isClockedIn) {
      recordClock(username, "out");
    } else {
      recordClock(username, "in");
    }

    // Toggle clocked in state
    setIsClockedIn((prevState) => !prevState);
  };

  return (
    <div>
      <Button
        variant="contained"
        color={isClockedIn ? "secondary" : "primary"}
        onClick={handleClick}
        sx={{ width: "200px", fontSize: "18px", padding: "16px" }}
      >
        {isClockedIn ? "Clock Out" : "Clock In"}
      </Button>
    </div>
  );
};

export default ClockButtons;
