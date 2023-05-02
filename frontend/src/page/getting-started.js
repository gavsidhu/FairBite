import React from "react";
import { CUISINE_TYPES } from "../constants";

function GettingStarted() {
  return (
    <div>
      <h1>Getting Started</h1>
      <h2>Cusines</h2>
      <ul>
        {Object.keys(CUISINE_TYPES).map((key) => (
          <li key={key}>{CUISINE_TYPES[key]}</li>
        ))}
      </ul>
    </div>
  );
}

export default GettingStarted;
