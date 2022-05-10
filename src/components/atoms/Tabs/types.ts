import { CSSProperties } from "react";

export interface Tab {
  label: string;
  content: JSX.Element;
}
export interface TabsProps {
  tabs: Tab[];
  style?: CSSProperties;
}
