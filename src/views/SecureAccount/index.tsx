import React from "react";
import { useStore } from "effector-react";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { $password, setPassword } from "@chains/radix/store";

import { Layout } from "@components/template";
import { Input, Button, Title, Paragraph } from "@components/atoms";

import * as S from "./style";

export const SecureAccount = () => {
  const password = useStore($password);
  const router = useRouter();

  const footer = (
    <>
      <S.Title>Set a new password</S.Title>
      <Input
        type="password"
        value={password}
        onChange={(value) => setPassword(value)}
      />
      <Button
        style={{ marginTop: "1.5rem" }}
        onClick={() => router.push(routesNames.CREATE_ACCOUNT as RouteKey)}
        disabled={!password}
      >
        Confirm
      </Button>
    </>
  );
  return (
    <Layout footer={footer}>
      <Title style={{ marginBottom: ".625rem" }}>Secure your account</Title>
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
