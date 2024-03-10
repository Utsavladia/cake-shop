import React from "react";
import "./homestyles.css";
import Bakers from "./Bakers";
import heroAudio from "../../Assets/typing.mp3";

const Part = () => {
  return (
    <div className="home">
      <div className="hero-home">
        <div className="shop-name">Sawariya</div>

        <div className="bakers-container">
          <Bakers />
        </div>
        <div className="hero-small"></div>
      </div>
      <audio autoPlay>
        <source src={heroAudio} type="audio/mpeg" />
        The audio
      </audio>
    </div>
  );
};

export default Part;
