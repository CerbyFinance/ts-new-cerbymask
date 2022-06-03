import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  footer?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  backButton?: boolean;
}
