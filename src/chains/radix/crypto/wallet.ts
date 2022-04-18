import { useCallback, useEffect, useState } from "react";
import { KeystoreT, Mnemonic } from "@radixdlt/application";
import { SigningKeychain } from "@radixdlt/account";

import { log } from "@utils";

import { loadKeystore } from "@chains/radix";

const {
  byEncryptingMnemonicAndSavingKeystore,
  byLoadingAndDecryptingKeystore,
} = SigningKeychain;

export const useWallet = () => {
  const [keystore, setKeystore] = useState<any>();

  useEffect(() => {
    (async () => {
      setKeystore(await loadKeystore());
    })();
  }, []);
  useEffect(() => {
    if (keystore) {
      log("Keystore loaded");
      log(keystore);
    }
  }, [keystore]);

  const createWallet = useCallback(
    async (password: string) => {
      const mnemonic = Mnemonic.generateNew();
      await byEncryptingMnemonicAndSavingKeystore({
        mnemonic,
        password,
        save: (keystore) => chrome.storage.local.set({ keystore }),
      });
      log("New wallet was created");
    },
    [keystore]
  );
  const retrieveWallet = useCallback(
    async (password: string) => {
      const wallet = await byLoadingAndDecryptingKeystore({
        password,
        load: loadKeystore,
      });
      log("Wallet was retrieved");
      return wallet;
    },
    [keystore]
  );

  return {
    createWallet,
    retrieveWallet,
  };
};
