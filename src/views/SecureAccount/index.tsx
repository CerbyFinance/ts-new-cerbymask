import React from "react";
import { useStore } from "effector-react";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { $walletCreationData, setPassword } from "@chains/radix/store";
import { createWallet } from "@chains/radix/crypto";

import { Layout } from "@components/template";
import { Input, Button, Title, Paragraph } from "@components/atoms";

export const SecureAccount = () => {
  const router = useRouter();

  const { password } = useStore($walletCreationData);

  const handleContinue = async () => {
    await createWallet(password);
    router.push(routesNames.CREATE_ACCOUNT as RouteKey);
  };

  const footer = (
    <>
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
      />
      <Button
        style={{ marginTop: "1.5rem" }}
        onClick={handleContinue}
        disabled={!password}
      >
        Continue
      </Button>
    </>
  );
  return (
    <Layout footer={footer} backButton>
      <Title style={{ marginBottom: "1rem" }}>Secure your wallet</Title>
      <Paragraph>
        Set up your password, that will allow you to easily sign in to the app
        and confirm all the operations you are making. You can’t change it and
        this code will remain while you have at least one imported wallet.
        <br />
        <br />
        If you forgot your password, you can recover access with any of your
        wallets recovery phrase.
      </Paragraph>
    </Layout>
  );
};
