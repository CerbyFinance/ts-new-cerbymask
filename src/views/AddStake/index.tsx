import React, { useState } from "react";
import { useStore } from "effector-react";
import toast from "react-hot-toast";

import { AccountAddressT } from "@radixdlt/account";

import { log } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { Token } from "@chains/radix/types";
import { stakeCoins } from "@chains/radix/api";
import {
  $activeAddress,
  $userTokens,
  $validators,
  getStakes,
  setUserTokens,
} from "@chains/radix/store";

import { Layout } from "@components/template";
import { Button, Input, Title, Warning, CoinSelect } from "@components/atoms";

import * as S from "./style";

export const AddStake = () => {
  const router = useRouter();

  const activeAddress = useStore($activeAddress);
  const userTokens = useStore($userTokens);
  const validators = useStore($validators);

  const [wasProceeded, setProceeded] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [formData, setFormData] = useState({
    rri: "",
    validator: validators.length > 0 ? validators[0].address.toString() : "",
    amount: "",
  });
  const validation = formData.amount;

  const handleProceed = () => {
    if (validation) {
      setProceeded(true);
    }
  };
  const handleFieldChange = (field: string, value: string) => {
    setFormData((formData) => ({ ...formData, [field]: value }));
  };
  const handleAddStake = async () => {
    log(formData);
    await toast.promise(
      stakeCoins({
        ...formData,
        onSubmit: () => router.redirect(routesNames.DASHBOARD as RouteKey),
      }),
      {
        loading: "Transaction is in progress...",
        success: "Transaction was submitted!",
        error: "Transaction error!",
      }
    );

    getStakes({ activeAddress: activeAddress as AccountAddressT });
    setUserTokens({ activeAddress: activeAddress as AccountAddressT });
  };

  const footer = (
    <>
      <S.Title>Enter password</S.Title>
      <Input
        type="password"
        value={password}
        onChange={(value) => setPassword(value)}
      />
      <Button
        style={{ marginTop: "1.5rem" }}
        onClick={() => {
          handleAddStake();
        }}
        disabled={!password}
      >
        Confirm transaction
      </Button>
    </>
  );
  return (
    <Layout footer={wasProceeded ? footer : null}>
      <Title>Add stake</Title>
      <Warning style={{ margin: "1rem 0" }}>
        You must stake at least 90 XRD for transaction to success!
      </Warning>
      <Input
        label="Staking account"
        value={activeAddress.toString()}
        disabled
        style={{ margin: ".625rem 0" }}
      />
      <Input
        label="Validator"
        value={formData.validator}
        onChange={(v) => handleFieldChange("validator", v)}
        disabled
      />
      <CoinSelect
        tokens={userTokens || []}
        onChange={(token: Token) => {
          handleFieldChange("rri", token.rri);
        }}
      />
      {formData.rri && (
        <Input
          label="Amount"
          value={formData.amount}
          onChange={(v) => handleFieldChange("amount", v)}
          style={{ margin: ".625rem 0" }}
        />
      )}
      {!wasProceeded && (
        <Button
          disabled={!validation}
          onClick={handleProceed}
          style={{
            width: "calc(100% - 3rem)",
            position: "absolute",
            left: "1.5rem",
            bottom: "1.25rem",
          }}
        >
          Proceed
        </Button>
      )}
    </Layout>
  );
};
