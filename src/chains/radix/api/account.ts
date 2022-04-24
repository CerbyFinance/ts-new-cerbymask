import { AccountAddressT } from "@radixdlt/account";
import { AccountBalancesEndpoint } from "@radixdlt/application/dist/api/open-api/_types";

import { Action } from "@chains/radix/types";

export const fetchActiveAddress = (
  action: Action
): Promise<AccountAddressT> => {
  const { api } = action;
  return new Promise((resolve, reject) => {
    api.activeAddress.subscribe((address: AccountAddressT) => {
      resolve(address);
    });
  });
};

// TypeScript TODO - optional generic
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
        resolve(balances);
      });
  });
};
