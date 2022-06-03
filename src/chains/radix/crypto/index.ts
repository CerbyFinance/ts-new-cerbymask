import { sha256 } from "js-sha256";
import { MnemomicT, Mnemonic, Network, Wallet } from "@radixdlt/application";
import { SigningKeychain } from "@radixdlt/account";

import {
  getAccountKeystore,
  getStorage,
  setStorage,
} from "@chains/radix/utils";

export * from "./config";

const {
  byEncryptingMnemonicAndSavingKeystore,
  byLoadingAndDecryptingKeystore,
} = SigningKeychain;

export const createWallet = async (
  password: string,
  network: Network,
  phrase?: string
) => {
  let mnemonic = Mnemonic.generateNew();
  if (phrase) {
    const mnemonicResult = Mnemonic.fromEnglishPhrase(phrase);
    if (mnemonicResult.isOk()) {
      mnemonic = mnemonicResult.value;
    }
  }

  const masterPassword = sha256(password);
  const walletResult = await byEncryptingMnemonicAndSavingKeystore({
    mnemonic,
    password: masterPassword,
    save: (keystore): Promise<void> => {
      return setStorage({ keystore });
    },
  });

  if (walletResult.isErr()) {
    throw walletResult.error;
  }

  const signingKeychain = walletResult.value;
  return Wallet.create({
    signingKeychain,
    network,
  });
};
export const retrieveWallet = async () => {
  const { masterPassword } = await getStorage(["masterPassword"]);
  const wallet = await byLoadingAndDecryptingKeystore({
    password: masterPassword,
    load: getAccountKeystore,
  });
  return wallet;
};
