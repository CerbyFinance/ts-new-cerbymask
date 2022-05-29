import { CSSProperties, Dispatch, SetStateAction } from "react";

export interface Tab {
  label: string;
  content: JSX.Element;
}
export interface TabsProps {
  tabs: Tab[];
  style?: CSSProperties;
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}
