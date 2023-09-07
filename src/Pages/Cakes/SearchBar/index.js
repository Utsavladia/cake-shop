import React from "react";
import Searchicon from "@material-ui/icons/Search";
import "./styles.css";

const Searchbar = ({ onChange }) => {
  return (
    <div className="search-bar">
      <Searchicon className="search-icon" />
      <input
        type="text"
        placeholder="Whats in your mind "
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
export default Searchbar;
