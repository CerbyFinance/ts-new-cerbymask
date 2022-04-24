import { createContext } from "react";
import toast from "react-hot-toast";

import { Radix as RadixApi, SigningKeychain } from "@radixdlt/application";

import {
  RadixApiOpts,
  RadixApiType,
  RadixApiContextValue,
} from "@chains/radix/types";
import { loadKeystore } from "@chains/radix/utils";
import { NETWORKS_LIST } from "@chains/radix/crypto";

import { log } from "@utils";

export * from "./account";
export * from "./token";
export * from "./tx";

const { byLoadingAndDecryptingKeystore } = SigningKeychain;

export const createRadixApi = () => {
  const api = RadixApi.create();

  return async (opts: RadixApiOpts): Promise<RadixApiType> => {
    const { url = NETWORKS_LIST.mainnet.url, password } = opts;

    await api.connect(url);

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
      await api.login(password, loadKeystore);
    }

    return api;
  };
};

export const RadixApiContext = createContext<RadixApiContextValue>({
  api: RadixApi.create(),
  connect: () => Promise.resolve(),
  connected: false,
});
