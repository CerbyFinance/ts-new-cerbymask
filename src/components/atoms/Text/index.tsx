import React, { ChangeEvent } from "react";

import { TextProps } from "./types";

import * as S from "./style";

// TODO: jsdoc
export const Text = (props: TextProps) => {
  const {
    onChange,
    transparent,
    bold,
    label,
    labelStyle,
    value,
    style,
    className,
    type,
    onClick,
    useTextarea,
  } = props;

  const valueProps = {
    bold,
    transparent,
    disabled: onChange ? false : true,
    value,
  };
  return (
    <div
      style={{ cursor: onClick ? "pointer" : "default", ...style }}
      className={className}
      onClick={onClick}
    >
      {label && <S.Label style={labelStyle}>{label}</S.Label>}
      {useTextarea ? (
        <S.ValueTextarea
          {...valueProps}
          onChange={(e) => {
            onChange && onChange(e.target.value);
          }}
        />
      ) : (
        <S.ValueInput
          {...valueProps}
          type={type || "text"}
          onChange={(e) => {
            onChange && onChange(e.target.value);
          }}
        />
      )}
    </div>
  );
};
