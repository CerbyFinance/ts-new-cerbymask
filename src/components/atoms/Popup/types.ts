import { ReactNode } from "react";

export interface PopupProps {
  title?: string;
  visible?: boolean;
  children: ReactNode;
  close: () => void;
  back?: () => void;
}
