import { Request, Response } from "express";
import axios from "axios";
import { DateTime } from "luxon";

const API_KEY = "UOL1Y2EOSZKF";
const TIMEZONE_API_URL = `http://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=zone&zone=Europe/Berlin`;

// Function to fetch the German time from the external API
export async function getGermanTime(): Promise<string> {
  try {
    const response = await axios.get(TIMEZONE_API_URL);
    const germanTime = response.data.formatted; // Get the formatted time
    const germanDateTime = DateTime.fromFormat(
      germanTime,
      "yyyy-MM-dd HH:mm:ss",
      { zone: "Europe/Berlin" }
    );
    if (!germanDateTime.isValid) {
      throw new Error("Invalid German time format");
    }
    return germanDateTime.toISO(); //Converts the DateTime object into a string in ISO 8601 format
  } catch (error) {
    console.error("Error fetching German time:", error);
    throw new Error("Failed to fetch German time");
  }
}

// Controller function to fetch and handle German time
export async function getCurrentGermanTime(req: Request, res: Response) {
  try {
    const timestamp = await getGermanTime();
    res.status(200).json({ time: timestamp });
  } catch (error) {
    console.error("Error fetching German time:", error);
    res.status(500).json({ error: "Failed to fetch German time" });
  }
}
