import { CSSProperties, ReactNode } from "react";

export interface CheckboxTheme {
  checkboxColor: string;
  labelColor: string;
  markColor: string;
  borderColor: string;
}

export interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  theme?: CheckboxTheme;
}

export interface CheckboxSC {
  theme: CheckboxTheme;
}
