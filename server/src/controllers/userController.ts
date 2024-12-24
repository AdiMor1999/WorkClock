import { Request, Response } from "express";
import { data } from "../app";
import { saveData } from "../utils";
import { getGermanTime } from "./timeController";

// Record clock-in or clock-out
export async function recordClock(req: Request, res: Response) {
  const { username } = req.params;
  const { type } = req.body; // 'in' for clock-in, 'out' for clock-out

  if (!type || (type !== "in" && type !== "out")) {
    res.status(400).json({ error: "Invalid clock type. Use 'in' or 'out'." });
    return;
  }

  // Check if the user exists
  const user = data.users.get(username);
  if (!user) {
    res.status(404).json({ error: "User not found." });
    return;
  }

  try {
    const currentTime = await getGermanTime();

    if (type === "in") {
      // Check if the user already has an active clock-in
      const activeClock = user.clockTimes.find(
        (clock) => clock.clockOut === null
      );
      if (activeClock) {
        res.status(400).json({ error: "You already have an active clock-in." });
        return;
      }

      // Add new clock-in
      user.clockTimes.push({ clockIn: currentTime, clockOut: null });
    } else if (type === "out") {
      // Find the last active clock-in
      const activeClock = user.clockTimes.find(
        (clock) => clock.clockOut === null
      );
      if (!activeClock) {
        res
          .status(400)
          .json({ error: "No active clock-in found to clock out." });
        return;
      }

      // Update the clock-out time
      activeClock.clockOut = currentTime;
    }

    // Save the updated data
    saveData(data);

    res.status(200).json({
      message: "Clock time recorded successfully",
      clockTimes: user.clockTimes,
    });
  } catch (error) {
    console.error("Error recording clock time:", error);
    res.status(500).json({ error: "Failed to record clock time" });
  }
}

// Fetch clock-in/out history for a user
export function getUserReports(req: Request, res: Response) {
  const { username } = req.params;

  // Check if the user exists
  const user = data.users.get(username);
  if (!user) {
    res.status(404).json({ error: "User not found." });
    return;
  }

  res.status(200).json({
    username,
    clockTimes: user.clockTimes,
  });
}
