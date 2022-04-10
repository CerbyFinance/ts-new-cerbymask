import React from "react";

import { ButtonProps } from "./types";

import * as S from "./style";

export const Button = (props: ButtonProps) => {
  const { disabled, children, onClick, style, className } = props;
  return (
    <S.Wrapper
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={className}
    >
      {children}
    </S.Wrapper>
  );
};
