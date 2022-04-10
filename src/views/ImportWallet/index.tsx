import React, { useState } from "react";

import { Layout } from "@components/template";
import { Button, Input, Title } from "@components/atoms";

export const ImportWallet = () => {
  const [formData, setFormData] = useState({
    name: "",
    phrase: "",
  });
  const validation = formData.name && formData.phrase;

  const handleFieldChange = (field: string, value: string) => {
    setFormData((formData) => ({ ...formData, [field]: value }));
  };

  return (
    <Layout>
      <Title>Import wallet</Title>
      <Input
        label="Title"
        value={formData.name}
        onChange={(v) => handleFieldChange("name", v)}
        style={{ margin: ".625rem 0" }}
      />
      <Input
        label="Private key / Ethereum address / Recovery phrase / ENS"
        value={formData.phrase}
        onChange={(v) => handleFieldChange("phrase", v)}
        useTextarea
        style={{ minHeight: "100px", marginBottom: ".625rem" }}
      />
      <Button disabled={!validation} onClick={() => {}}>
        Confirm
      </Button>
    </Layout>
  );
};
