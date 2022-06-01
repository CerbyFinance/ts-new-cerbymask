import React, { useState } from "react";
import { sha256 } from "js-sha256";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { login } from "@chains/radix/api";
import { initWallet, setStorage } from "@chains/radix/utils";

import { Layout } from "@components/template";
import { Logo, Input, Button } from "@components/atoms";

import { COLORS } from "@globalStyle";
import * as S from "./style";

export const SignIn = () => {
  const router = useRouter();

  const [password, setPassword] = useState<string>("");

  const handleSetPassword = (password: string) => {
    setPassword(password);
    setStorage({
      masterPassword: sha256(password),
    });
  };

  const footer = (
    <>
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={handleSetPassword}
      />
      <Button
        style={{ marginTop: "1.5rem" }}
        onClick={async () => {
          await login();
          await initWallet();
          router.redirect(routesNames.DASHBOARD as RouteKey);
        }}
        disabled={!password}
      >
        Log in
      </Button>
      <S.Action
        onClick={() => router.push(routesNames.IMPORT_WALLET as RouteKey)}
      >
        Import using Secret Recovery Phrase
      </S.Action>
      <S.Action
        onClick={() => router.redirect(routesNames.SIGN_UP as RouteKey)}
        style={{ color: COLORS.red }}
      >
        Reset wallet
      </S.Action>
    </>
  );

  return (
    <Layout footer={footer}>
      <Logo />
    </Layout>
  );
};
