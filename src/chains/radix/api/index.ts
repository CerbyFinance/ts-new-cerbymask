import { useEffect, useState } from "react";
import { Radix as RadixApi } from "@radixdlt/application";
import { AccountAddressT } from "@radixdlt/account";
import { NETWORKS_LIST, loadKeystore } from "@chains/radix";
import { RadixApiOpts } from "@chains/radix";
import { AccountBalancesEndpoint } from "@radixdlt/application/dist/api/open-api/_types";
import axios from "axios";
import { log } from "@utils";

const apiSetup = async (opts: RadixApiOpts) => {
  const { url = NETWORKS_LIST.mainnet.url, password } = opts;

  const api = RadixApi.create();
  await api.connect(url);
  await api.login(password, loadKeystore);
  return api;
};

export const useRadixApi = (opts: RadixApiOpts) => {
  const [state, setState] = useState<any>({});
  const [api, setApi] = useState<any>();

  const getActiveAddress = (): Promise<AccountAddressT> =>
    new Promise((resolve, reject) => {
      api.activeAddress.subscribe((address: AccountAddressT) => {
        chrome.storage.local.set({ activeAddress: address });
        setState((state: any) => ({ ...state, activeAddress: address }));
        log("Active address set");
        resolve(address);
      });
    });
  const getTokenBalances = (address: AccountAddressT) => {
    api.ledger
      .tokenBalancesForAddress(address)
      .subscribe((balances: AccountBalancesEndpoint.DecodedResponse) => {
        setState((state: any) => ({ ...state, balances }));
        chrome.storage.local.set({ balances: JSON.stringify(balances) });
        log("Get token balances");
      });
  };
  const getXrdUsd = async () => {
    try {
      const {
        data: { last_price },
      } = await axios.get("https://api.bitfinex.com/v1/pubticker/xrdusd");
      setState((state: any) => ({ ...state, xrdUsd: last_price }));
      chrome.storage.local.set({ xrdUsd: last_price });
      log("Get XRDUSD ticker");
    } catch (e) {
      throw new Error("getXrdUsd failed");
    }
  };

  useEffect(() => {
    (async () => {
      setApi(await apiSetup(opts));
    })();
  }, []);
  useEffect(() => {
    if (api) {
      (async () => {
        const address = await getActiveAddress();
        getTokenBalances(address);
        getXrdUsd();
      })();
    }
  }, [api]);

  return {
    state,
    getActiveAddress,
    getTokenBalances,
    getXrdUsd,
  };
};
