import { sha256 } from "js-sha256";

import { addAccount, authenticate } from "@store";

import { StoreAccountOpts } from "@chains/radix/types";
import { connectToRadixApi, fetchActiveAddress } from "@chains/radix/api";
import { resetWalletCreationData } from "@chains/radix/store";

export * from "./convert";
export * from "./map";
export * from "./storage";

export const sliceAddress = (address: string, end?: number) =>
  `${address.slice(0, end || 12)}...${address.slice(-4)}`;

export const storeAccount = async (opts: StoreAccountOpts) => {
  const { mnemonic, keystore } = opts;

  await connectToRadixApi(keystore);
  authenticate(true);
  const address = await fetchActiveAddress();
  addAccount({
    address: address.toString(),
    mnemonic,
    keystore,
  });
  resetWalletCreationData();
};
