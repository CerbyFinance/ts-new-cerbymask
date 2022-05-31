import toast from "react-hot-toast";
import { ReplaySubject } from "rxjs";

import {
  KeystoreT,
  ManualUserConfirmTX,
  Radix as RadixApi,
  SigningKeychain,
} from "@radixdlt/application";

import { getAccountKeystore } from "@chains/radix/utils";

import { log } from "@utils";

export * from "./api";

const { byLoadingAndDecryptingKeystore } = SigningKeychain;

export const radixApi = RadixApi.create();

export const connectToRadixApi = async (keystore?: KeystoreT) => {
  const loadKeystore = keystore ? async () => keystore : getAccountKeystore;

  const { masterPassword, network } = await chrome.storage.local.get([
    "masterPassword",
    "network",
  ]);
  await radixApi.connect(network.url);

  const result = await byLoadingAndDecryptingKeystore({
    password: masterPassword,
    load: loadKeystore,
  });
  if (result.isErr()) {
    log(result.error);
    log("Failed to connect to the API. Invalid credentials");
    toast.error("Invalid password", {
      style: {
        background: "#333",
        color: "white",
        borderRadius: ".5rem",
      },
    });
    throw new Error();
  } else {
    await radixApi.login(masterPassword, loadKeystore);
  }
};

// userConfirmation ReplaySubject
export const userConfirmation = new ReplaySubject<ManualUserConfirmTX>();
userConfirmation.subscribe((txToConfirm) => {
  log("txToConfirm");
  log(txToConfirm);
  txToConfirm.confirm();
});
