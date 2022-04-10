import React from "react";
import { Routes } from "./Routes";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
export function Navigator({ numberOfMessages, route, setRoute }) {
  return (
    <div>
      <a
        href="#"
        onClick={() => setRoute(Routes.ALICE)}
        style={getStyles(route, Routes.ALICE)}
      >
        Alice skriver till Bob
      </a>{" "}
      <a
        href="#"
        onClick={() => setRoute(Routes.BOB)}
        style={getStyles(route, Routes.BOB)}
      >
        <Badge badgeContent={numberOfMessages} color="primary" sx={{ mr: 2 }}>
          <MailIcon color="action" />
        </Badge>
        Bobs inbox
      </a>
      <a
        href="#"
        onClick={() => setRoute(Routes.WALLET)}
        style={getStyles(route, Routes.WALLET)}
      >
        Generate new crypto keys
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
