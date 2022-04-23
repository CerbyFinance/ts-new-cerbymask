import { AccountAddressT } from "@radixdlt/account";
import { AccountBalancesEndpoint } from "@radixdlt/application/dist/api/open-api/_types";

import { Action } from "@chains/radix/types";
import { log } from "@utils";

export const fetchActiveAddress = (
  action: Action
): Promise<AccountAddressT> => {
  const { api } = action;
  return new Promise((resolve, reject) => {
    api.activeAddress.subscribe((address: AccountAddressT) => {
      // chrome.storage.local.set({ activeAddress: address });
      // setState((state: any) => ({ ...state, activeAddress: address }));
      log("Active address set");
      resolve(address);
    });
  });
};
export const fetchTokenBalances = (
  action: Action<{ address: AccountAddressT }>
): Promise<AccountBalancesEndpoint.DecodedResponse> => {
  const {
    api,
    payload: { address },
  } = action;
  return new Promise((resolve, reject) => {
    api.ledger
      .tokenBalancesForAddress(address)
      .subscribe((balances: AccountBalancesEndpoint.DecodedResponse) => {
        // setState((state: any) => ({ ...state, balances }));
        // chrome.storage.local.set({ balances: JSON.stringify(balances) });
        log("Get token balances");
        resolve(balances);
      });
  });
};
