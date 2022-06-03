import React from "react";

import { WarningProps } from "./types";

import * as S from "./style";
import { ICONS } from "@globalStyle";

export const Warning = (props: WarningProps) => {
  const { children, style, className } = props;

  return (
    <S.Wrapper className={className} style={style}>
      <ICONS.Warning width="46" />
      WARNING: {children}
    </S.Wrapper>
  );
};
