import React from "react";

import { ButtonProps } from "./types";

import * as S from "./style";

export const Button = (props: ButtonProps) => {
  const { disabled, children, onClick, style, className, passive } = props;
  return (
    <S.Wrapper
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
      style={style}
      className={className}
      passive={passive}
    >
      {children}
    </S.Wrapper>
  );
};
