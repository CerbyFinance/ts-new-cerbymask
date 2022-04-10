import React from "react";

export type InputType = "password" | "text";

export interface TextSC {
  transparent?: boolean;
  bold?: boolean;
}
export interface TextProps extends TextSC {
  onChange?: (value: string) => void;
  label?: string;
  labelStyle?: React.CSSProperties;
  value: string;
  style?: React.CSSProperties;
  className?: string;
  type?: InputType;
  onClick?: () => void;
  useTextarea?: boolean;
}
