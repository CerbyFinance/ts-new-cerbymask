import React, { useState } from "react";
import { useStore, useStoreMap } from "effector-react";
import toast from "react-hot-toast";
import { AccountAddressT } from "@radixdlt/account";

import { log } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { convertToMainUnit, sliceAddress } from "@chains/radix/utils";
import { Token } from "@chains/radix/types";
import {
  $activeAddress,
  $userTokens,
  setUserTokens,
} from "@chains/radix/store";
import { sendCoins } from "@chains/radix/api";

import { Layout } from "@components/template";
import { Button, Checkbox, Input, Title } from "@components/atoms";
import { Select } from "@components/molecules";

import { COLORS } from "@globalStyle/colors";
import * as S from "./style";

export const SendCoins = () => {
  const activeAddress = useStoreMap($activeAddress, (address) =>
    address.toString()
  );
  const userTokens = useStoreMap($userTokens, (tokens) =>
    tokens
      ? tokens.map((token) => ({
          key: token.rri,
          value: token,
        }))
      : []
  );
  const router = useRouter();

  const [selectedToken, setSelectedToken] = useState<Token>();
  const [formData, setFormData] = useState({
    from: activeAddress,
    amount: "0",
    rri: "",
    to: "",
    message: "",
    encrypt: false,
  });

  const accounts = [
    {
      key: activeAddress,
      value: {
        address: activeAddress,
      },
    },
  ];

  const handleFieldChange = (field: string, value: unknown) => {
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

    // setUserTokens({ activeAddress });
  };

  const { from, amount, to, rri, message, encrypt } = formData;
  return (
    <Layout backButton>
      <Title style={{ marginBottom: "1.5rem" }}>Send token</Title>
      <Select
        label="From"
        popupTitle="Account"
        selected={from}
        onSelect={(value) => handleFieldChange("from", value)}
        options={accounts}
        renderSelected={(option: any, index: number) => {
          const { address } = option;
          return (
            <div>
              Account #{index}{" "}
              <span style={{ color: COLORS.extralight }}>
                ({sliceAddress(address)})
              </span>
            </div>
          );
        }}
        renderOption={(option, i) => {
          const { key, selected, select } = option;
          return (
            <S.OptionAccount>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  id={`send-account-${i}`}
                  onChange={() => (selected ? select("") : select(key))}
                  checked={selected}
                  style={{ marginRight: ".75rem" }}
                />
                Account #{i}
              </div>
              <div style={{ color: COLORS.extralight }}>
                {sliceAddress(key)}
              </div>
            </S.OptionAccount>
          );
        }}
      />
      <Select
        style={{ margin: "1rem 0" }}
        label="Token"
        popupTitle="Token"
        selected={rri}
        onSelect={(value) => handleFieldChange("rri", value)}
        options={userTokens}
        renderSelected={(option) => {
          const { ticker } = option as Token;
          return <div>{ticker}</div>;
        }}
        renderOption={(option, i) => {
          const { key, selected, select } = option;
          return (
            <S.OptionAccount>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  id={`send-account-${i}`}
                  onChange={() => (selected ? select("") : select(key))}
                  checked={selected}
                  style={{ marginRight: ".75rem" }}
                />
                Account #{i}
              </div>
              <div style={{ color: COLORS.extralight }}>
                {sliceAddress(key)}
              </div>
            </S.OptionAccount>
          );
        }}
      />
      <Input
        label="Amount"
        value={amount}
        onChange={(amount) => {
          handleFieldChange("amount", amount);
        }}
        style={{ marginBottom: ".625rem" }}
      />
      <Input
        label="To"
        value={to}
        onChange={(address: string) => {
          handleFieldChange("to", address);
        }}
        style={{ margin: "1rem 0" }}
      />
      <Input
        label={
          <S.MessageLabel>
            <div>
              Message <span>(optional)</span>
            </div>
            <div>
              <Checkbox
                id="encrypt-checkbox"
                onChange={(checked) => {
                  handleFieldChange("encrypt", checked);
                }}
                checked={encrypt}
                style={{ marginRight: ".5rem" }}
              />
              Encrypt
            </div>
          </S.MessageLabel>
        }
        value={message}
        onChange={(message: string) => {
          handleFieldChange("message", message);
        }}
      />
      <Button
        disabled={!rri}
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
        Transfer
      </Button>
    </Layout>
  );
};
