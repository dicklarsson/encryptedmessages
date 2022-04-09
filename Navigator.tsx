import React from "react";
import { Routes } from "./Routes";

export function Navigator({ route, setRoute }) {
  return (
    <div>
      <a
        href="#"
        onClick={() => setRoute(Routes.HOME)}
        style={getStyles(route, Routes.HOME)}
      >
        Home
      </a>
      <a
        href="#"
        onClick={() => setRoute(Routes.WALLET)}
        style={getStyles(route, Routes.WALLET)}
      >
        Wallet
      </a>
    </div>
  );
}

function getStyles(currentRoute: Routes, linkRoute: Routes) {
  const style = {
    display: "inline-block",
    border: "1px solid black",
    padding: "10px",
    borderRadius: "10px",
    marginRight: "20px",
    textDecoration: "none",
    background: currentRoute === linkRoute ? "#EFEFEF" : "",
  };

  return style;
}
