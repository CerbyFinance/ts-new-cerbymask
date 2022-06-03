import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { log } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { $wallet } from "@chains/radix/store";

import { Layout } from "@components/template";
import { Button, Checkbox, Paragraph, Title } from "@components/atoms";
import { RecoveryPhrase } from "@components/molecules";

export const CreateAccount = () => {
  const router = useRouter();

  const wallet = useStore($wallet);

  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [memorized, setMemorized] = useState<boolean>(false);

  const handleMemorize = (checked: boolean) => {
    setMemorized(checked);
  };

  useEffect(() => {
    if (wallet) {
      setMnemonic(wallet.revealMnemonic().words);
      log("mnemonic");
      log(wallet.revealMnemonic().words);
    }
  }, [wallet]);

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

  return (
    <Layout backButton footer={footer}>
      <Title>Your recovery phrase</Title>
      <Paragraph style={{ marginTop: "1rem" }}>
        Write down or copy these words in the right order and save them
        somewhere safe.
      </Paragraph>
      <RecoveryPhrase words={mnemonic} isLoading={mnemonic.length === 0} />
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
