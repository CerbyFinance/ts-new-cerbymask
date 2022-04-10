import React from "react";

import { WarningProps } from "./types";

import * as S from "./style";
import WarningIcon from "@assets/svg/warning.svg";

export const Warning = (props: WarningProps) => {
  const { children, style, className } = props;

  return (
    <S.Wrapper className={className} style={style}>
      <WarningIcon width="46" />
      Warning: {children}
    </S.Wrapper>
  );
};
