import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { $wallet } from "@chains/radix/store";
import { login } from "@chains/radix/api";
import { initWallet } from "@chains/radix/utils";

import { Layout, Status } from "@components/template";
import { Button, Input, Paragraph, Title } from "@components/atoms";

import { ICONS } from "@globalStyle";
import * as S from "./style";

export const CheckRecoveryPhrase = () => {
  const router = useRouter();

  const wallet = useStore($wallet);

  const [mnemonic, setMnemonic] = useState<string[]>([]);
  // Indexes start from zero so second word in an array is a third word in a mnemonic
  const [checker, setChecker] = useState({
    2: "",
    4: "",
    6: "",
    8: "",
  });

  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [isAuthError, setAuthError] = useState<boolean>(false);

  const handleContinue = async () => {
    setAuthError(false);
    try {
      await login();
      await initWallet();
      router.redirect(routesNames.DASHBOARD as RouteKey);
    } catch {
      setAuthError(true);
    } finally {
      setShowStatus(true);
    }
  };
  const handleSetChecker = (wordNumber: string, phrase: string) => {
    setChecker((checker) => ({
      ...checker,
      [wordNumber]: phrase,
    }));
  };

  useEffect(() => {
    if (wallet) {
      setMnemonic(wallet.revealMnemonic().words);
    }
  }, [wallet]);

  const isCheckerValid =
    checker[2] === mnemonic[2] &&
    checker[4] === mnemonic[4] &&
    checker[6] === mnemonic[6] &&
    checker[8] === mnemonic[8];
  const footer = (
    <>
      <Button disabled={!isCheckerValid} onClick={handleContinue}>
        Continue
      </Button>
    </>
  );

  if (showStatus) {
    const statusProps = isAuthError
      ? {
          icon: <ICONS.StatusError />,
          title: "Wallet was not created!",
          paragraph:
            "We have some kind of error that we are already dealing with.",
          button: (
            <Button
              passive
              onClick={() => {
                setShowStatus(false);
              }}
            >
              Back
            </Button>
          ),
        }
      : {
          icon: <ICONS.StatusSuccess />,
          title: "Wallet created!",
          button: (
            <Button
              onClick={() => {
                router.push(routesNames.DASHBOARD as RouteKey);
              }}
            >
              Go to wallet
            </Button>
          ),
        };
    return <Status {...statusProps} />;
  }
  return (
    <Layout backButton footer={footer}>
      <Title>Check recovery phrase</Title>
      <Paragraph style={{ marginTop: "1rem" }}>
        Write the words below in the fields to check the correctness.
      </Paragraph>
      <S.Form>
        {Object.entries(checker).map((entry) => {
          const [n, phrase] = entry;
          return (
            <div key={`checker-${n}`}>
              <span>{parseInt(n, 10) + 1}.</span>
              <Input
                value={phrase}
                onChange={(v) => {
                  handleSetChecker(n, v);
                }}
              />
            </div>
          );
        })}
      </S.Form>
    </Layout>
  );
};
