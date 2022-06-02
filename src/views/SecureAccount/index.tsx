import React, { useState } from "react";
import { useStore } from "effector-react";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { createWallet } from "@chains/radix/crypto";
import { $selectedNetwork, setWallet } from "@chains/radix/store";
import { activateSession, setAccountsIndex } from "@chains/radix/utils";

import { Layout } from "@components/template";
import { Input, Button, Title, Paragraph, Loader } from "@components/atoms";

export const SecureAccount = () => {
  const router = useRouter();

  const selectedNetwork = useStore($selectedNetwork);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState("");

  const handleContinue = async () => {
    setLoading(true);

    try {
      const wallet = await createWallet(password, selectedNetwork);
      await activateSession(password);
      setWallet(wallet);
      setAccountsIndex(0, selectedNetwork);

      router.push(routesNames.CREATE_ACCOUNT as RouteKey);
    } finally {
      setLoading(false);
    }
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
        disabled={!password || isLoading}
      >
        {isLoading ? <Loader button /> : "Continue"}
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
