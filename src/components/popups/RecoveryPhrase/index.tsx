import React, { useEffect, useState } from "react";

import { Popup } from "@components/atoms";

import { COLORS } from "@globalStyle";
import { RecoveryPhrase } from "@components/molecules";

export const RecoveryPhrasePopup = ({
  close,
  visible,
}: {
  close: () => void;
  visible: boolean;
}) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    (async () => {
      const { mnemonic } = await chrome.storage.local.get("mnemonic");
      if (mnemonic) {
        setWords(mnemonic);
      }
    })();
  }, []);
  return (
    <Popup visible={visible} title="View recovery phrase" close={close}>
      <p
        style={{
          fontSize: ".875rem",
          color: COLORS.extralight,
          marginBottom: "1rem",
        }}
      >
        If you ever change browsers or move computers, you will need this phrase
        to access your accounts. Save them somewhere safe and secret.
      </p>
      <RecoveryPhrase words={words} isProtected />
    </Popup>
  );
};
