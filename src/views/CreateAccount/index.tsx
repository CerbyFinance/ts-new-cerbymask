import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { useRouter } from "@router";

import { createWallet } from "@chains/radix/crypto";
import { $network, $password } from "@chains/radix/store";
import { afterAuth } from "@chains/radix/utils";

import { Layout } from "@components/template";
import { Button, Checkbox, Paragraph, Title, Warning } from "@components/atoms";

import { theme as checkboxTheme } from "@components/atoms/Checkbox/theme";
import * as S from "./style";

export const CreateAccount = () => {
  const router = useRouter();

  const network = useStore($network);
  const password = useStore($password);

  const [words, setWords] = useState<string[]>([]);
  const [memorized, setMemorized] = useState<boolean>(false);

  const handleMemorize = (checked: boolean) => {
    setMemorized(checked);
  };

  const footer = (
    <>
      <Button onClick={() => afterAuth({ password, url: network.url }, router)}>
        Create my first wallet
      </Button>
    </>
  );

  useEffect(() => {
    (async () => {
      const mnemonic = await createWallet(password);
      setWords(mnemonic.toString().split(" "));
    })();
  }, []);

  return (
    <Layout backButton footer={footer}>
      <Title>Your recovery phrase</Title>
      <Paragraph style={{ marginTop: "1rem" }}>
        Write down or copy these words in the right order and save them
        somewhere safe.
      </Paragraph>
      <Warning style={{ margin: "1rem 0" }}>
        Never share recovery phrase with anyone, store it securely!
      </Warning>
      <S.Phrases>
        <div>
          {words.slice(0, words.length / 2).map((word, i) => (
            <S.Phrase key={word}>
              {i + 1}. {word}
            </S.Phrase>
          ))}
        </div>
        <div>
          {words.slice(words.length / 2, words.length).map((word, i) => (
            <S.Phrase key={word}>
              {i + 1 + words.length / 2}. {word}
            </S.Phrase>
          ))}
        </div>
      </S.Phrases>
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
