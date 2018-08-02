import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ height: "auto", clear: "both", padding: 60, textAlign: "center" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
