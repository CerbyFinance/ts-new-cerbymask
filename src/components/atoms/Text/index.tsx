import React from "react";

import { TextProps } from "./types";

import * as S from "./style";

export const Text = (props: TextProps) => {
  const { customizable, bold, label, labelStyle, value, style, className } =
    props;

  return (
    <div style={style} className={className}>
      {label && <S.Label style={labelStyle}>{label}</S.Label>}
      <S.Value bold={bold}>{value}</S.Value>
    </div>
  );
};
