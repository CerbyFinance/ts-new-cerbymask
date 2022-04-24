import React, { useState } from "react";
import { useStore } from "effector-react";
import ReactSelect, { StylesConfig } from "react-select";

import { $userTokens } from "@chains/radix/store";

import { Layout } from "@components/template";
import { Button, Input, Title } from "@components/atoms";

import { COLORS } from "@globalStyle/colors";

const selectStyles: StylesConfig = {
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: COLORS.background,
    border: "2px solid rgba(255, 255, 255, 0.1)",
    padding: "0.5rem 0.875rem",
    borderRadius: "0.75rem",
  }),
  container: (provided, state) => ({
    ...provided,
    borderRadius: ".75rem",
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: COLORS.background,
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.1)",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  }),
};

export const SendCoins = () => {
  const userTokens = useStore($userTokens);

  const [formData, setFormData] = useState({
    amount: "0",
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData((formData) => ({ ...formData, [field]: value }));
  };

  return (
    <Layout backButton>
      <Title>Send coins</Title>
      <ReactSelect options={[]} styles={selectStyles} />
      <Input
        label="$3.01"
        value={`${formData.amount} ETH`}
        onChange={(v) =>
          handleFieldChange(
            "amount",
            parseInt(v, 10) ? parseInt(v, 10).toString() : ""
          )
        }
        style={{ margin: ".625rem 0" }}
      />
      <Input label="To address" value="0x9c...3cae" disabled />
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
        onClick={() => {}}
      >
        Send coins
      </Button>
    </Layout>
  );
};
