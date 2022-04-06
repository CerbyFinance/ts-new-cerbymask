import { useState } from "react";
import axios from "axios";

import { NETWORKS_LIST, NetworkApi, Network } from "@chains/radix";

import * as tokens from "./tokens";
import * as account from "./account";
import * as validators from "./validators";
import * as tx from "./tx";

const commonHeaders = {
  "X-Radixdlt-Target-Gw-Api": "1.1.0",
  "Content-Type": "application/json",
};
const mainnet = axios.create({
  baseURL: NETWORKS_LIST.mainnet.url,
  headers: {
    ...commonHeaders,
  },
});
const stokenet = axios.create({
  baseURL: NETWORKS_LIST.stokenet.url,
  headers: {
    ...commonHeaders,
  },
});

export const useRadixApi = (network: Network) => {
  const { name } = network;

  const networkApi: NetworkApi = {
    name,
    api: name === NETWORKS_LIST.mainnet.name ? mainnet : stokenet,
  };

  const domains = Object.fromEntries(
    Object.entries({
      tokens,
      account,
      validators,
      tx,
    }).map((domain: any) => {
      const [name, api] = domain;
      return [
        name,
        Object.fromEntries(
          Object.entries(api).map((fnEntry: any) => {
            const [fnName, fn] = fnEntry;
            return [fnName, fn.bind(null, networkApi)];
          })
        ),
      ];
    })
  );

  return {
    ...domains,
  };
};

export { mainnet, stokenet };
