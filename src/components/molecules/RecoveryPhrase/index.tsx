import React, { useState } from "react";
import toast from "react-hot-toast";

import { getAccountKeystore } from "@chains/radix/utils";

import { RecoveryPhraseProps } from "./types";

import { Button, Input, Loader, Warning } from "@components/atoms";

import * as S from "./style";
import { SigningKeychain } from "@radixdlt/account";

export const RecoveryPhrase = (props: RecoveryPhraseProps) => {
  const { words, isProtected, isLoading } = props;

  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleAuth = async () => {
    const result = await SigningKeychain.byLoadingAndDecryptingKeystore({
      load: getAccountKeystore,
      password,
    });

    if (result.isOk()) {
      setAuthenticated(true);
    } else {
      toast.error("Invalid password");
    }
  };

  const showRecoveryPhrase = (isAuthenticated && isProtected) || !isProtected;
  const showAuth = !isAuthenticated && isProtected;

  const phrases = showRecoveryPhrase && (
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
  );
  return (
    <>
      <Warning style={{ margin: "1rem 0" }}>
        Never share recovery phrase with anyone, store it securely!
      </Warning>
      {showAuth && (
        <div>
          <Input
            type="password"
            value={password}
            onChange={setPassword}
            label="Password"
          />
          <Button
            onClick={handleAuth}
            style={{ width: "100%", marginTop: "1.5rem" }}
          >
            Continue
          </Button>
        </div>
      )}
      {isLoading ? <Loader /> : phrases}
    </>
  );
};
