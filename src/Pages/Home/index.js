import React from "react";
import "./homestyles.css";
import backgroundImage from "./yellowcake.jpeg";
import Bakers from "./Bakers";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import "./home2.css";

export default function Home() {
  return (
    <>
      <div
        className="home"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="img-container">Sawariya</div>

        <div className="bakers-container">
          <Bakers />
        </div>
      </div>
      <div className="home2">
        <Part1 />
        <Part2 />
        <Part3 />
      </div>
    </>
  );
}

// Start the global animation loop
