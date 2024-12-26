import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { getGermanTime } from "../api/timeApi";

const Clock: React.FC = () => {
  const [germanTime, setGermanTime] = useState<DateTime | null>(null);

  // Function to fetch German time from the API
  useEffect(() => {
    const fetchGermanTime = async () => {
      const timeString = await getGermanTime(); //2024-12-26T10:50:39.000+01:00
      const time = DateTime.fromISO(timeString, { zone: "Europe/Berlin" });
      //Luxon’s DateTime helps avoid the JavaScript default behavior of automatically converting times to the local timezone.
      setGermanTime(time);
    };

    fetchGermanTime();
  }, []);

  // Function to update the German time every second
  useEffect(() => {
    if (!germanTime) return;

    const interval = setInterval(() => {
      setGermanTime((prevTime) =>
        prevTime ? prevTime.plus({ seconds: 1 }) : null
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [germanTime]);

  // Format the German time using Luxon's format method
  const formattedTime = germanTime
    ? germanTime.toLocaleString(DateTime.TIME_SIMPLE) // You can also use other formats here if needed
    : "Loading...";

  return <p>German Time: {formattedTime}</p>;
};

export default Clock;
