import { CSSProperties, ReactNode } from "react";

export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  passive?: boolean;
  loading?: boolean;
}
