import { CSSProperties } from "react";
import { InputType } from "@components/atoms/types";

export interface InputProps {
  disabled?: boolean;
  transparent?: boolean;
  placeholder?: string;
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  type?: InputType;
  style?: CSSProperties;
  className?: string;
  useTextarea?: boolean;
}

export interface InputSC extends InputProps {
  focused: boolean;
}
