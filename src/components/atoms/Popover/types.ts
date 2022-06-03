import { CSSProperties, ReactNode } from "react";
import { PopperContentProps } from "@radix-ui/react-popover";

export interface PopoverProps {
  icon: JSX.Element;
  children?: ReactNode;
  contentProps?: PopperContentProps;
  contentStyle?: CSSProperties;
}
