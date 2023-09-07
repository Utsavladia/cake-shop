import React from "react";
import { Occasion } from "./Occasions";
import { Link } from "react-router-dom";

import "./home2.css";

function Part2() {
  return (
    <div className="part2">
      <h1 className="heading">Celebrate special Occasions</h1>
      <div className="occ-cards">
        {Occasion.map((item, index) => (
          <Link to={item.url} className="occ-card" key={index}>
            <div className="card-image">
              <img src={item.image} alt={item.alt} />
            </div>
            <h2 className="occ-title">{item.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Part2;
