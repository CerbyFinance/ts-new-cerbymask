import React from "react";

export * as COLORS from "./colors";
export * as TOKEN_ICONS from "./tokenIcons";
export * as Z_INDEXES from "./zIndexes";
export * as ICONS from "./icons";
export * as MIXINS from "./mixins";
export * as PALETTES from "./palettes";

import { Reset } from "./reset";
import { Fonts } from "./fonts";

export const GlobalStyle = () => {
  return (
    <>
      <Reset />
      <Fonts />
    </>
  );
};
