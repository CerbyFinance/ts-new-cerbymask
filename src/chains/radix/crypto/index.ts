import { Mnemonic } from "@radixdlt/application";
import { SigningKeychain } from "@radixdlt/account";

import { loadKeystore } from "@chains/radix/utils";
import { log } from "@utils";

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

  await byEncryptingMnemonicAndSavingKeystore({
    mnemonic,
    password,
    save: (keystore) => chrome.storage.local.set({ keystore }),
  });
  const mnemonicArr = mnemonic.toString().split(" ");
  await chrome.storage.local.set({
    mnemonic: mnemonicArr,
  });
  return mnemonicArr;
};
export const retrieveWallet = async (password: string) => {
  const wallet = await byLoadingAndDecryptingKeystore({
    password,
    load: loadKeystore,
  });
  return wallet;
};
