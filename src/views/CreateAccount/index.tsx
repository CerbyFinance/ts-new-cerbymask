import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { log } from "@utils";

import { $password } from "@store";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { createWallet } from "@chains/radix/crypto";

import { Layout } from "@components/template";
import { Button, Checkbox, Paragraph, Title } from "@components/atoms";
import { RecoveryPhrase } from "@components/molecules";

export const CreateAccount = () => {
  const router = useRouter();

  const password = useStore($password);

  const [words, setWords] = useState<string[]>([]);
  const [memorized, setMemorized] = useState<boolean>(false);

  const handleMemorize = (checked: boolean) => {
    setMemorized(checked);
  };

  const footer = (
    <>
      <Button
        disabled={!memorized}
        onClick={() => {
          router.push(routesNames.CHECK_RECOVERY_PHRASE as RouteKey);
        }}
      >
        Continue
      </Button>
    </>
  );

  useEffect(() => {
    (async () => {
      const mnemonic = await createWallet(password);
      log("mnemonic");
      log(mnemonic);
      setWords(mnemonic);
    })();
  }, []);

  return (
    <Layout backButton footer={footer}>
      <Title>Your recovery phrase</Title>
      <Paragraph style={{ marginTop: "1rem" }}>
        Write down or copy these words in the right order and save them
        somewhere safe.
      </Paragraph>
      <RecoveryPhrase words={words} isLoading={words.length === 0} />
      <Checkbox
        id="checkbox-memorized"
        checked={memorized}
        onChange={handleMemorize}
        style={{ marginBottom: "1.5rem" }}
      >
        I understand that if I lose my recovery phrase, I will not be able to
        access my funds.
      </Checkbox>
    </Layout>
  );
};
