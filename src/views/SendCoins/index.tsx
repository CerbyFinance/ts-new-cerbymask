import React, { useState } from "react";
import { useStore } from "effector-react";
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
import { sendCoins } from "@chains/radix/api";

import { Layout } from "@components/template";
import { Button, Input, Title } from "@components/atoms";
import { CoinSelect } from "@components/atoms/CoinSelect";

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
      <CoinSelect
        tokens={userTokens || []}
        onChange={(token) => {
          setSelectedToken(token);
          handleFieldChange("rri", token.rri);
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
