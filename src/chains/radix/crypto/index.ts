import { sha256 } from "js-sha256";
import { Mnemonic } from "@radixdlt/application";
import { SigningKeychain } from "@radixdlt/account";

import { getAccountKeystore } from "@chains/radix/utils";
import { setKeystore, setMnemonic } from "@chains/radix/store";

export * from "./config";

const {
  byEncryptingMnemonicAndSavingKeystore,
  byLoadingAndDecryptingKeystore,
} = SigningKeychain;

export const createWallet = async (
  password: string,
  defaultMnemonic?: string
) => {
  let mnemonic;
  if (defaultMnemonic) {
    const mnemonicResult = Mnemonic.fromEnglishPhrase(defaultMnemonic);
    if (mnemonicResult.isOk()) {
      mnemonic = mnemonicResult.value;
    } else {
      throw new Error("Invalid mnemonic phrase");
    }
  } else {
    mnemonic = Mnemonic.generateNew();
  }

  const masterPassword = sha256(password);
  await chrome.storage.local.set({ masterPassword });
  await byEncryptingMnemonicAndSavingKeystore({
    mnemonic,
    password: masterPassword,
    save: async (keystore) => {
      setKeystore(keystore);
      return Promise.resolve();
    },
  });
  const mnemonicArr = mnemonic.toString().split(" ");
  setMnemonic(mnemonicArr);
};
export const retrieveWallet = async (password: string) => {
  const wallet = await byLoadingAndDecryptingKeystore({
    password,
    load: getAccountKeystore,
  });
  return wallet;
};
