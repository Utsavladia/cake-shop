import React from "react";
import { Special } from "./Special";
import { Link } from "react-router-dom";

import "./home2.css";

function Part3() {
  return (
    <div className="part1">
      <div className="heading">
        <h1>Special Cakes</h1>
      </div>
      <div className="flavour-cards">
        {Special.map((item, index) => (
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

export default Part3;
