import React from "react";

import { Title } from "./style";

import Wolf from "@assets/img/logo.png";

export const Logo = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={Wolf} alt="CerbyMask logo" width="50%" height="50%" />
      <Title>Cerby</Title>
      <p
        style={{ marginTop: ".5rem", fontFamily: "Jost", fontSize: ".825rem" }}
      >
        Your digital wallet
      </p>
    </div>
  );
};
