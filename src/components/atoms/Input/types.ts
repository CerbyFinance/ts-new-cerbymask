import { CSSProperties } from "react";
import { InputType } from "@components/atoms/types";

export interface InputProps {
  disabled?: boolean;
  placeholder?: string;
  label?: string | JSX.Element;
  value: string;
  onChange?: (value: string) => void;
  type?: InputType;
  style?: CSSProperties;
  className?: string;
}
