import React from "react";
import "./homestyles.css";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Reviews from "./Reviews";
import Footer from "./footer";
import "./home2.css";
import Part from "./Part";

export default function Home() {
  return (
    <>
      <Part />

      <div className="home2">
        <Part1 />
        <Part2 />
        <Part3 />
        <Reviews />
        <Footer />
      </div>
    </>
  );
}

// Start the global animation loop
