import React from "react";

import { Title } from "./style";

import Wolf from "@assets/img/wolf.png";

export const Logo = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={Wolf} alt="CerbyMask logo" width="50%" height="50%" />
      <Title>Cerby</Title>
    </div>
  );
};
