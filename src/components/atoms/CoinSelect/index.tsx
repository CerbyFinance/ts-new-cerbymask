import React from "react";
import ReactSelect, { OptionProps } from "react-select";

import { Token } from "@chains/radix/types";
import { convertToMainUnit } from "@chains/radix/utils";
import { TOKEN_ICONS } from "@chains/radix/crypto";

import { CoinSelectProps } from "./types";

import * as S from "./style";

const Option: React.FC<OptionProps> = (props) => {
  const { data, innerRef, innerProps } = props;
  const { usdBalance, ticker, value, rri } = data as Token;

  const icon = TOKEN_ICONS[rri];
  return (
    <S.CoinOption ref={innerRef} {...innerProps}>
      <S.CoinBalance>
        ${usdBalance.toFixed(2)}
        <strong>
          {convertToMainUnit(value)} {ticker}
        </strong>
      </S.CoinBalance>
      <S.CoinIcon>
        {ticker}
        {icon}
      </S.CoinIcon>
    </S.CoinOption>
  );
};

// TypeScript TODO - no-any
const formatOptionLabel = (data: any) => {
  const { ticker } = data as Token;
  return <div>{ticker}</div>;
};

export const CoinSelect = (props: CoinSelectProps) => {
  const { tokens, onChange } = props;

  return (
    <ReactSelect
      placeholder="Select token..."
      options={tokens}
      components={{ Option }}
      formatOptionLabel={formatOptionLabel}
      styles={S.selectStyles}
      isSearchable={false}
      onChange={(token: any) => {
        onChange(token);
      }}
    />
  );
};
