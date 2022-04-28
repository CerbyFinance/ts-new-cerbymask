import React, { useState } from "react";
import { useStore } from "effector-react";

import { afterAuth } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { $network } from "@chains/radix/store";

import { Layout } from "@components/template";
import { Logo, Input, Button } from "@components/atoms";

import * as S from "./style";

export const SignIn = () => {
  const network = useStore($network);
  const router = useRouter();

  const [password, setPassword] = useState<string>("");

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
        onClick={() => afterAuth({ password, url: network.url }, router)}
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
