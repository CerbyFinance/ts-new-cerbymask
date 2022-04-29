import { Mnemonic } from "@radixdlt/application";
import { SigningKeychain } from "@radixdlt/account";

import { loadKeystore } from "@chains/radix/utils";

export * from "./config";
export * from "./tokenIcons";

const {
  byEncryptingMnemonicAndSavingKeystore,
  byLoadingAndDecryptingKeystore,
} = SigningKeychain;

export const createWallet = async (password: string) => {
  const mnemonic = Mnemonic.generateNew();
  await byEncryptingMnemonicAndSavingKeystore({
    mnemonic,
    password,
    save: (keystore) => chrome.storage.local.set({ keystore }),
  });
  return mnemonic;
};
export const retrieveWallet = async (password: string) => {
  const wallet = await byLoadingAndDecryptingKeystore({
    password,
    load: loadKeystore,
  });
  return wallet;
};
