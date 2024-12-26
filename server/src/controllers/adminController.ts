import { Request, Response } from "express";
import { data } from "../app";
import { saveData } from "../utils";

// Admin: Retrieve all users' reports
export function getAllReports(req: Request, res: Response) {
  try {
    const reports = Array.from(data.users.values()).map((user) => ({
      username: user.username,
      clockTimes: user.clockTimes,
    }));

    res.status(200).json({ reports }); //array of objects, each containing the username and the associated clockTimes for that user
    return;
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Failed to fetch reports" });
    return;
  }
}

// Admin: Edit a user's clock-in/out time
export function editUserReport(req: Request, res: Response) {
  const { username } = req.params; // Extract username from route parameters
  const { index, clockIn, clockOut } = req.body; // Extract the data from the request body

  // Check if the user exists
  const user = data.users.get(username);
  if (!user) {
    res.status(404).json({ error: "User not found." });
    return;
  }

  // Edit the clock-in/clock-out time at the specified index
  const clockTime = user.clockTimes[index];

  if (clockIn) {
    clockTime.clockIn = clockIn; // Update clock-in time if provided
  }
  if (clockOut) {
    clockTime.clockOut = clockOut; // Update clock-out time if provided
  }

  // Save the updated data to the file
  saveData(data);

  res.status(200).json({
    message: "Clock time updated successfully",
    updatedClockTime: {
      index,
      clockIn: clockTime.clockIn,
      clockOut: clockTime.clockOut,
    },
  });
}
