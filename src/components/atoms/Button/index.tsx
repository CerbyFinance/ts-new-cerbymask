import React from "react";

import { ButtonProps } from "./types";

import { Loader } from "@components/atoms";

import * as S from "./style";

export const Button = (props: ButtonProps) => {
  const { disabled, children, onClick, style, className, passive, loading } =
    props;
  return (
    <S.Wrapper
      disabled={disabled || loading}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
      style={style}
      className={className}
      passive={passive}
    >
      {loading ? <Loader button /> : children}
    </S.Wrapper>
  );
};
