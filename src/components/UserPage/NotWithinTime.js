import React from "react";

const NotWithinTime = ({ startTime, endTime }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "Center",
        height: "80vh",
        width: "40vw",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontFamily: "verdena", fontWeight: "lighter" }}>
        ⏰Please visit the link only within {startTime.substring(0, 10)}{" "}
        {startTime.substring(11, 16)} and {endTime.substring(0, 10)}{" "}
        {endTime.substring(11, 16)}
      </h2>
    </div>
  );
};

export default NotWithinTime;
