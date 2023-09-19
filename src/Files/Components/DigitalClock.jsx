import React, { useEffect, useState } from 'react';
import { useGetTimeValues } from '../Hooks';

export const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date())
    }
    setInterval(updateTime, 1000);
    return () => {
      clearInterval(updateTime)
    }
  }, [])

  let { month, day, week, hours, minutes, seconds } = useGetTimeValues("date", currentTime);
  return (
    <div style={{
      fontFamily: "Roboto", maxWidth: "300px", textAlign: "center", fontSize: "1.5rem",margin:"0 auto",
      borderRadius:"0.75rem",padding:"0.5rem",background:"rgba(255,255,255,0.5)",
      boxShadow:"0 4px 30px rgba(0,0,0,0.1)",border:"1px solid rgba(255, 255, 255, 0.3)",
    }}>
      <div>
        {hours > 12 ? hours - 12 : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
        <small>{hours > 12 ? "PM" : "AM"}</small></div>
      <div>{weeksNames[week]} </div>
      <div>{day} - {monthsNames[month]}</div>
    </div>
  )
}
const monthsNames = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}
const weeksNames = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
}
