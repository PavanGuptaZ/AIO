import React from 'react';
import { DigitalClock, HighsTasks, NameDetails } from '../Components';

export const OverView = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div style={{
        background: "url(https://source.unsplash.com/random/?nature) center/cover", width: "100%",
        padding: "2rem", borderRadius: "1rem"
      }}>
        <DigitalClock  />
      </div>
      <NameDetails />
      <HighsTasks/>
    </div>

  )
}
