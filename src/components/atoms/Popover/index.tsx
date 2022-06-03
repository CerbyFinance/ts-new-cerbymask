import React from "react";

import * as PopoverPrimitive from "@radix-ui/react-popover";

import { PopoverProps } from "./types";

import * as S from "./style";

export const Popover = (props: PopoverProps) => {
  const { icon, children, contentProps, contentStyle } = props;
  return (
    <div>
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>{icon}</PopoverPrimitive.Trigger>
        <PopoverPrimitive.Anchor />
        <S.PopoverContent {...contentProps} style={contentStyle}>
          {children}
        </S.PopoverContent>
      </PopoverPrimitive.Root>
    </div>
  );
};
