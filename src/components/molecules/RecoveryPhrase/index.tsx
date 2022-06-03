import React, { useState } from "react";
import toast from "react-hot-toast";
import { SigningKeychain } from "@radixdlt/account";
import { sha256 } from "js-sha256";

import { getAccountKeystore } from "@chains/radix/utils";

import { RecoveryPhraseProps } from "./types";

import { Button, Input, Loader, Warning } from "@components/atoms";

import * as S from "./style";

export const RecoveryPhrase = (props: RecoveryPhraseProps) => {
  const { words, isProtected, isLoading } = props;

  const [password, setPassword] = useState<string>("");
  const [isAuthLoading, setAuthLoading] = useState<boolean>(false);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const handleAuth = async () => {
    setAuthLoading(true);
    try {
      const result = await SigningKeychain.byLoadingAndDecryptingKeystore({
        load: getAccountKeystore,
        password: sha256(password),
      });

      if (result.isOk()) {
        setAuthenticated(true);
      } else {
        toast.error("Invalid password");
      }
    } finally {
      setAuthLoading(false);
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
            loading={isAuthLoading}
          >
            Continue
          </Button>
        </div>
      )}
      {isLoading ? <Loader /> : phrases}
    </>
  );
};
