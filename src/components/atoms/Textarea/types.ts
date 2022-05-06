import { CSSProperties } from "react";
import { InputType } from "@components/atoms/types";

export interface TextareaProps {
  disabled?: boolean;
  transparent?: boolean;
  placeholder?: string;
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  type?: InputType;
  style?: CSSProperties;
  className?: string;
  textareaStyle?: CSSProperties;
}
