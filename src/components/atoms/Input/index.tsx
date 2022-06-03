import React from "react";

import { InputProps } from "./types";

import * as S from "./style";

export const Input = (props: InputProps) => {
  const {
    type,
    label,
    value,
    onChange,
    placeholder = "",
    disabled,
    style,
    className,
  } = props;

  return (
    <S.Wrapper style={style} className={className}>
      {label && <S.Label>{label}</S.Label>}
      <S.Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
      />
    </S.Wrapper>
  );
};
