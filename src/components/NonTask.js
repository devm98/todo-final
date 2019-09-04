import React from "react";
import picture from "../assets/images/start.jpg";
export default function nonTask() {
  return (
    <div style={{ top: "25%", left: "45%" }} className="position-absolute">
      <img style={{ height: "65vh" }} src={picture} alt="" />
    </div>
  );
}
