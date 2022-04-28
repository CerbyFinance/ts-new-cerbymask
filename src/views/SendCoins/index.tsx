import React, { useContext, useState } from "react";
import { useStore } from "effector-react";
import ReactSelect, { OptionProps, StylesConfig } from "react-select";
import toast from "react-hot-toast";
import { AccountAddressT } from "@radixdlt/account";

import { log } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { convertToMainUnit } from "@chains/radix/utils";
import { Token } from "@chains/radix/types";
import {
  $activeAddress,
  $userTokens,
  setUserTokens,
} from "@chains/radix/store";
import { TOKEN_ICONS } from "@chains/radix/crypto";
import { sendCoins } from "@chains/radix/api";

import { Layout } from "@components/template";
import { Button, Input, Title } from "@components/atoms";

import * as S from "./style";
import { COLORS } from "@globalStyle/colors";

const selectStyles: StylesConfig = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: COLORS.background,
    border: "2px solid rgba(255, 255, 255, 0.1)",
    padding: "0.5rem 0.875rem",
    borderRadius: "0.75rem",
  }),
  container: (provided) => ({
    ...provided,
    borderRadius: ".75rem",
    margin: ".625rem 0",
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: COLORS.background,
    padding: "0 .175rem",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.1) !important",
    borderRadius: "0.75rem",
    fontSize: ".875rem",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.1)",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  }),
};

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

export const SendCoins = () => {
  const activeAddress = useStore($activeAddress);
  const userTokens = useStore($userTokens);
  const router = useRouter();

  const [selectedToken, setSelectedToken] = useState<Token>();
  const [formData, setFormData] = useState({
    amount: "0",
    rri: "",
    to: "",
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData((formData) => ({ ...formData, [field]: value }));
  };
  const handleSendCoins = async () => {
    log(formData);
    await toast.promise(
      sendCoins({
        ...formData,
        onSubmit: () => router.redirect(routesNames.DASHBOARD as RouteKey),
      }),
      {
        loading: "Transaction is in progress...",
        success: "Transaction was submitted!",
        error: "Transaction error!",
      }
    );

    setUserTokens({ activeAddress: activeAddress as AccountAddressT });
  };

  const { amount, to } = formData;
  return (
    <Layout backButton>
      <Title>Send coins</Title>
      <ReactSelect
        options={userTokens || []}
        components={{ Option }}
        formatOptionLabel={formatOptionLabel}
        styles={selectStyles}
        isSearchable={false}
        onChange={(token: any) => {
          setSelectedToken(token);
          handleFieldChange("rri", (token as Token).rri);
        }}
      />
      {selectedToken && (
        <Input
          label={`Amount (max ${convertToMainUnit(selectedToken.value)} ${
            selectedToken.ticker
          })`}
          value={amount}
          onChange={(amount) => {
            handleFieldChange("amount", amount);
          }}
          style={{ marginBottom: ".625rem" }}
        />
      )}
      <Input
        label="To address"
        value={to}
        onChange={(address: string) => {
          handleFieldChange("to", address);
        }}
      />
      <Input
        label="Gas fee"
        value="0.0007 or $0.49"
        disabled
        transparent
        style={{ margin: ".625rem 0" }}
      />
      <Button
        style={{
          width: "calc(100% - 3rem)",
          position: "absolute",
          left: "1.5rem",
          bottom: "1.25rem",
        }}
        onClick={() => {
          handleSendCoins();
        }}
      >
        Send coins
      </Button>
    </Layout>
  );
};
