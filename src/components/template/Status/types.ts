import { ReactNode } from "react";

export interface StatusProps {
  icon: ReactNode;
  title: string;
  paragraph?: string;
  button?: ReactNode;
}
