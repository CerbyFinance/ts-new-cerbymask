import React, { useState } from "react";
import toast from "react-hot-toast";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { Layout } from "@components/template";
import { Button, Input, Textarea, Paragraph, Title } from "@components/atoms";

export const ImportWallet = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: "",
    phrase: "",
  });
  const validation = formData.password && formData.phrase;

  const handleFieldChange = (field: string, value: string) => {
    setFormData((formData) => ({ ...formData, [field]: value }));
  };

  const handleImport = async () => {
    const { password, phrase } = formData;
    try {
      /*
      await createWallet(password, phrase);
      await storeAccount({
        mnemonic,
        keystore: keystore as KeystoreT,
      });
      router.redirect(routesNames.DASHBOARD as RouteKey);
      */
    } catch {
      toast.error("Invalid phrase");
    }
  };

  const footer = (
    <>
      <Button disabled={!validation} onClick={handleImport}>
        Import wallet
      </Button>
    </>
  );

  return (
    <Layout footer={footer} backButton>
      <Title>Import wallet</Title>
      <Paragraph style={{ margin: "1rem 0 1.5rem" }}>
        Write the security phrase below in the fields and set up new password
      </Paragraph>
      <Textarea
        label="Security phrase"
        value={formData.phrase}
        onChange={(v) => {
          handleFieldChange("phrase", v);
        }}
        style={{ margin: ".625rem 0" }}
        textareaStyle={{ minHeight: "8.25rem" }}
      />
      <Input
        label="New password"
        type="password"
        value={formData.password}
        onChange={(v) => {
          handleFieldChange("password", v);
        }}
        style={{ minHeight: "100px", marginBottom: ".625rem" }}
      />
    </Layout>
  );
};
