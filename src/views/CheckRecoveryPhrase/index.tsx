import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { log } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { $password, addAccount } from "@store";

import { $network } from "@chains/radix/store";
import { afterAuth } from "@chains/radix/utils";

import { Layout, Status } from "@components/template";
import { Button, Input, Paragraph, Title } from "@components/atoms";

import { ICONS } from "@globalStyle";
import * as S from "./style";

export const CheckRecoveryPhrase = () => {
  const router = useRouter();

  const network = useStore($network);
  const password = useStore($password);

  const [words, setWords] = useState<string[]>([]);

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
      const address = await afterAuth({ password, url: network.url }, router);
      if (address) {
        addAccount({
          address: address.toString(),
          mnemonic: words,
        });
      }
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
    (async () => {
      const { mnemonic } = await chrome.storage.local.get("mnemonic");
      log("mnemonic");
      log(mnemonic);
      setWords(mnemonic);
    })();
  }, []);

  const isCheckerValid =
    checker[2] === words[2] &&
    checker[4] === words[4] &&
    checker[6] === words[6] &&
    checker[8] === words[8];
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
