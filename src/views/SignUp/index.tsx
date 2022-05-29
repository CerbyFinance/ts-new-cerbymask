import React from "react";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { Layout } from "@components/template";
import { Logo, Button } from "@components/atoms";

import { HaveAccount } from "./style";

export const SignUp = () => {
  const router = useRouter();

  const footer = (
    <>
      <Button
        onClick={() => router.push(routesNames.SECURE_ACCOUNT as RouteKey)}
      >
        Create new wallet
      </Button>
      <Button
        style={{ marginTop: "1rem", background: "rgba(255, 255, 255, 0.1)" }}
        onClick={() => {
          router.push(routesNames.IMPORT_WALLET as RouteKey);
        }}
      >
        Recover existing
      </Button>
      <HaveAccount
        onClick={() => router.redirect(routesNames.SIGN_IN as RouteKey)}
      >
        Already have an account?
      </HaveAccount>
    </>
  );
  return (
    <Layout footer={footer}>
      <Logo />
    </Layout>
  );
};
