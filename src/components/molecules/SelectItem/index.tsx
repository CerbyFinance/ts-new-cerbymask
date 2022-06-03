import React from "react";

import { AccountProps } from "./types";

import { Checkbox } from "@components/atoms";

import { COLORS } from "@globalStyle";
import * as S from "./style";

export const SelectItem = (props: AccountProps) => {
  const { label, description, value, checkboxId, onSelect, selected } = props;
  return (
    <S.Account>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          id={checkboxId}
          onChange={() => {
            onSelect(value);
          }}
          checked={selected}
          style={{ marginRight: ".75rem" }}
        />
        {label}
      </div>
      {description && (
        <div style={{ color: COLORS.extralight }}>{description}</div>
      )}
    </S.Account>
  );
};
