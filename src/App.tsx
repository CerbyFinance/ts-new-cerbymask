import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Toaster } from "react-hot-toast";

import { Radix as RadixApi } from "@radixdlt/application";

import { connectRadixApi } from "@chains/radix";
import { RadixApiContext } from "@chains/radix/api";
import {
  $activeAddress,
  $network,
  setActiveAddress,
  setBalances,
} from "@chains/radix/store";
import { RadixApiType } from "@chains/radix/types";

import { log } from "@utils";
import { Router, RouterView } from "@router";

import { GlobalStyle } from "./globalStyle";

export const App = () => {
  const network = useStore($network);
  const activeAddress = useStore($activeAddress);
  const [isRadixApiConnected, setRadixApiConnected] = useState<boolean>(false);
  const [radixApi, setRadixApi] = useState<RadixApiType>(RadixApi.create());

  const connect = async (password: string) => {
    try {
      const api = await connectRadixApi({
        url: network.url,
        password,
      });
      setRadixApi(api);
      setRadixApiConnected(true);

      setActiveAddress({ api });
    } catch {}
  };

  useEffect(() => {
    if (activeAddress) {
      setBalances({ api: radixApi, payload: { address: activeAddress } });
    }
  }, [activeAddress]);

  log(`isApiConnected = ${isRadixApiConnected}`);

  // Auth state
  const authenticated = isRadixApiConnected;
  return (
    <RadixApiContext.Provider
      value={{
        api: radixApi,
        connect,
        connected: isRadixApiConnected,
      }}
    >
      <Toaster />
      <GlobalStyle />
      <Router>
        <RouterView authenticated={authenticated} />
      </Router>
    </RadixApiContext.Provider>
  );
};
