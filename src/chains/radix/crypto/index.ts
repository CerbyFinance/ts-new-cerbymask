import { sha256 } from "js-sha256";
import { Mnemonic, Network, Wallet } from "@radixdlt/application";
import { SigningKeychain } from "@radixdlt/account";

import { getAccountKeystore, setStorage } from "@chains/radix/utils";
import { log } from "@utils";

export * from "./config";

const {
  byEncryptingMnemonicAndSavingKeystore,
  byLoadingAndDecryptingKeystore,
} = SigningKeychain;

export const createWallet = async (password: string, network: Network) => {
  const mnemonic = Mnemonic.generateNew();

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
export const retrieveWallet = async (password: string) => {
  const wallet = await byLoadingAndDecryptingKeystore({
    password,
    load: getAccountKeystore,
  });
  return wallet;
};
