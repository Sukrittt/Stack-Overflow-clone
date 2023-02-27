import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <svg viewBox="25 25 50 50" className="loading-svg">
      <circle r="20" cy="50" cx="50" className="loading-circle"></circle>
    </svg>
  );
};

export default Loading;
