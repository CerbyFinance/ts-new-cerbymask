import React, { useState } from "react";

import { Layout } from "@components/template";
import { Button, Checkbox, Paragraph, Title, Warning } from "@components/atoms";

import { theme as checkboxTheme } from "@components/atoms/Checkbox/theme";
import * as S from "./style";

import CopyIcon from "@assets/svg/copy.svg";

export const CreateAccount = () => {
  const [memorized, setMemorized] = useState<boolean>(false);

  const handleMemorize = (checked: boolean) => {
    setMemorized(checked);
  };
  const handleCreateWallet = () => {};

  const words = [
    "carry",
    "domain",
    "gloom",
    "there",
    "big",
    "shuffle",
    "net",
    "pair",
    "range",
    "pill",
    "warning",
    "demand",
  ];

  const footer = (
    <>
      <S.RecoveryHeader>
        <h4>Your recovery phrase</h4>
        <CopyIcon />
      </S.RecoveryHeader>
      <Paragraph style={{ margin: "0.25rem 0 1rem" }}>
        Write down or copy these words in the right order and save them
        somewhere safe.
      </Paragraph>
      <Checkbox
        id="checkbox-memorized"
        checked={memorized}
        onChange={handleMemorize}
        theme={checkboxTheme.alert}
        style={{ marginBottom: "1.5rem" }}
      >
        I understand that if I lose my recovery phrase, I will not be able to
        access my funds.
      </Checkbox>
      <Button onClick={handleCreateWallet}>Create my first wallet</Button>
    </>
  );

  return (
    <Layout footer={footer}>
      <Title>Create account</Title>
      <Warning style={{ margin: "1.25rem 0" }}>
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
    </Layout>
  );
};
