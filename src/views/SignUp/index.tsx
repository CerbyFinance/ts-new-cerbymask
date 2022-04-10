import React from "react";

import { Layout } from "@components/template";
import { Logo, Button } from "@components/atoms";

import { COLORS } from "@globalStyle/colors";

export const SignUp = () => {
  const footer = (
    <>
      <Button
        onClick={() =>
          chrome.runtime.sendMessage({
            title: "debug-log",
            data: "click",
          })
        }
      >
        Create new account
      </Button>
      <Button
        style={{ marginTop: ".625rem", backgroundColor: COLORS.darkblue }}
        onClick={() =>
          chrome.runtime.sendMessage({
            title: "debug-log",
            data: "click",
          })
        }
      >
        Recover existing
      </Button>
    </>
  );
  return (
    <Layout footer={footer} footerBackground={false}>
      <Logo />
    </Layout>
  );
};
