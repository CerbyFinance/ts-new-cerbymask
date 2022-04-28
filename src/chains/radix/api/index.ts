import toast from "react-hot-toast";

import { Radix as RadixApi, SigningKeychain } from "@radixdlt/application";

import { RadixApiOpts } from "@chains/radix/types";
import { loadKeystore } from "@chains/radix/utils";
import { NETWORKS_LIST } from "@chains/radix/crypto";

import { log } from "@utils";

export * from "./account";
export * from "./token";
export * from "./tx";
export * from "./stakes";

const { byLoadingAndDecryptingKeystore } = SigningKeychain;

export const radixApi = RadixApi.create();

export const connectToRadixApi = async (opts: RadixApiOpts) => {
  const { url = NETWORKS_LIST.mainnet.url, password } = opts;

  await radixApi.connect(url);

  const result = await byLoadingAndDecryptingKeystore({
    password,
    load: loadKeystore,
  });
  if (result.isErr()) {
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
    await radixApi.login(password, loadKeystore);
  }
};
