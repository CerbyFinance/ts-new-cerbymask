import React, { useState } from "react";

import { Layout } from "@components/template";
import { Logo, Input, Button } from "@components/atoms";

import * as S from "./style";

export const SignIn = () => {
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
        onClick={() =>
          chrome.runtime.sendMessage({
            title: "debug-log",
            data: "click",
          })
        }
        disabled={!password}
      >
        Sign in to your account
      </Button>
    </>
  );
  return (
    <Layout footer={footer}>
      <Logo />
    </Layout>
  );
};
