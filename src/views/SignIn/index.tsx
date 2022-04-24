import React, { useContext, useState } from "react";

import { log } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { RadixApiContext } from "@chains/radix/api";

import { Layout } from "@components/template";
import { Logo, Input, Button } from "@components/atoms";

import * as S from "./style";

export const SignIn = () => {
  const router = useRouter();
  const radixApi = useContext(RadixApiContext);

  const [password, setPassword] = useState<string>("");

  const signIn = async () => {
    await radixApi.connect(password);
    if (radixApi.connected) {
      router.redirect(routesNames.SEND_COINS as RouteKey);
    }
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
        onClick={() => signIn()}
        disabled={!password}
      >
        Sign in to your account
      </Button>
      <S.ForgotPassword
        onClick={() => router.redirect(routesNames.SIGN_UP as RouteKey)}
      >
        Forgot password?
      </S.ForgotPassword>
    </>
  );

  return (
    <Layout footer={footer}>
      <Logo />
    </Layout>
  );
};
