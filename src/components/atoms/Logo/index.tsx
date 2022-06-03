import React from "react";

import { Title } from "./style";

import Wolf from "@assets/svg/wolf.svg";

export const Logo = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Wolf />
      <Title>Cerby</Title>
      <p
        style={{ marginTop: ".5rem", fontFamily: "Jost", fontSize: ".825rem" }}
      >
        Your digital wallet
      </p>
    </div>
  );
};
