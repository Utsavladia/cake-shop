import React from "react";
import { Flavour } from "./Flavour";
import { Link } from "react-router-dom";

import "./home2.css";

function Part1() {
  return (
    <div className="part1">
      <div className="heading">
        <h1>Pick a Flavour</h1>
      </div>
      <div className="flavour-cards">
        {Flavour.map((item, index) => (
          <Link to={item.url} className="flavour-card" key={index}>
            <div className="card-image">
              <img src={item.image} alt={item.alt} />
            </div>
            <div className="flavour-title">{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Part1;
