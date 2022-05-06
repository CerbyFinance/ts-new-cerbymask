import React from "react";

import { TextareaProps } from "./types";

import * as S from "./style";

export const Textarea = (props: TextareaProps) => {
  const {
    type,
    label,
    value,
    onChange,
    placeholder = "",
    disabled,
    style,
    className,
    textareaStyle,
  } = props;

  return (
    <S.Wrapper style={style} className={className}>
      {label && <S.Label>{label}</S.Label>}
      <S.Textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
        style={textareaStyle}
      />
    </S.Wrapper>
  );
};
