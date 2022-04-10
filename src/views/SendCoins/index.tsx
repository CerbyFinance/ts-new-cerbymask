import React, { useState } from "react";

import { Layout } from "@components/template";
import { Button, Input, Title } from "@components/atoms";

export const SendCoins = () => {
  const [formData, setFormData] = useState({
    amount: "0",
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData((formData) => ({ ...formData, [field]: value }));
  };

  return (
    <Layout>
      <Title>Send coins</Title>
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
