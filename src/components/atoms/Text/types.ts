import React from "react";

export interface TextProps {
  customizable?: boolean; // soon it will be used for Input
  bold?: boolean;
  label?: string;
  labelStyle?: React.CSSProperties;
  value: string;
  style?: React.CSSProperties;
  className?: string;
}
