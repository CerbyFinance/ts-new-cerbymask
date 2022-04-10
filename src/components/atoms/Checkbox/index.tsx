import React from "react";

import { CheckboxProps } from "./types";

import { theme as themeList } from "./theme";
import * as S from "./style";

export const Checkbox = (props: CheckboxProps) => {
  const {
    checked,
    onChange,
    id,
    children,
    style,
    className,
    theme = themeList.default,
  } = props;

  return (
    <div style={style} className={className}>
      <S.Checkbox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onChange(!checked)}
        theme={theme}
      />
      <S.Label htmlFor={id} theme={theme}>
        <span>
          <svg width="12px" height="10px" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        </span>
        {children && <span>{children}</span>}
      </S.Label>
    </div>
  );
};
