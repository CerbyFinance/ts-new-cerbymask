import React, { useState } from "react";

import { Layout } from "@components/template";
import { Button, Input, Title } from "@components/atoms";

import * as S from "./style";
import { useStore } from "effector-react";
import { $activeAddress } from "@chains/radix/store";
import { $validators } from "@chains/radix/store/stakes";
import { log } from "@utils";

export const AddStake = () => {
  const activeAddress = useStore($activeAddress);
  const validators = useStore($validators);
  log(validators);

  const [wasProceeded, setProceeded] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [formData, setFormData] = useState({
    account: activeAddress.toString(),
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
        onClick={() =>
          chrome.runtime.sendMessage({
            title: "debug-log",
            data: "click",
          })
        }
        disabled={!password}
      >
        Confirm transaction
      </Button>
    </>
  );
  return (
    <Layout footer={wasProceeded ? footer : null}>
      <Title>Add stake</Title>
      <Input
        label="Staking account"
        value={formData.account}
        disabled
        style={{ margin: ".625rem 0" }}
        useTextarea
      />
      <Input
        label="Validator"
        value={formData.validator}
        onChange={(v) => handleFieldChange("validator", v)}
        disabled
        useTextarea
      />
      <Input
        label="Amount"
        value={formData.amount}
        onChange={(v) => handleFieldChange("amount", v)}
        style={{ margin: ".625rem 0" }}
      />
      <Input label="Gas fee" value="0.000000" transparent />
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
