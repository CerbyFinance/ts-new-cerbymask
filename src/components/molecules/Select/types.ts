import { CSSProperties } from "react";

export interface SelectOption {
  key: string;
  value: unknown;
}
export interface RenderOption {
  selected: boolean;
  data: unknown;
  select: (key: string) => void;
  key: string;
}
export interface SelectProps {
  selected: string;
  onSelect: (key: string) => void;
  options: SelectOption[];
  label?: string;
  popupTitle?: string;
  renderOption: (option: RenderOption, index: number) => JSX.Element;
  renderSelected: (option: unknown, index: number) => JSX.Element;
  placeholder?: string;
  style?: CSSProperties;
}
