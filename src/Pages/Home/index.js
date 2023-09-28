import React from "react";
import "./homestyles.css";
import Bakers from "./Bakers";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import "./home2.css";

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="hero-home">
          <div className="shop-name">Sawariya</div>

          <div className="bakers-container">
            <Bakers />
          </div>
          <div className="hero-small"></div>
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
