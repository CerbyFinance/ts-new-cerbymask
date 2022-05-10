import React, { useState } from "react";
import { useStore } from "effector-react";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { afterAuth } from "@chains/radix/utils";
import { $network } from "@chains/radix/store";

import { Layout } from "@components/template";
import { Logo, Input, Button } from "@components/atoms";

import { COLORS } from "@globalStyle/colors";
import * as S from "./style";

export const SignIn = () => {
  const network = useStore($network);
  const router = useRouter();

  const [password, setPassword] = useState<string>("");

  const footer = (
    <>
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(value) => setPassword(value)}
      />
      <Button
        style={{ marginTop: "1.5rem" }}
        onClick={() => afterAuth({ password, url: network.url }, router)}
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
