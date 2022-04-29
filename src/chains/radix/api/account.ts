import { AccountAddressT } from "@radixdlt/account";
import { AccountBalancesEndpoint } from "@radixdlt/application/dist/api/open-api/_types";

import { radixApi } from ".";

export const fetchActiveAddress = (): Promise<AccountAddressT> => {
  return new Promise((resolve, reject) => {
    radixApi.activeAddress.subscribe((address: AccountAddressT) => {
      resolve(address);
    });
  });
};

export const fetchTokenBalances = (payload: {
  activeAddress: AccountAddressT;
}): Promise<AccountBalancesEndpoint.DecodedResponse> => {
  const { activeAddress } = payload;
  return new Promise((resolve, reject) => {
    radixApi.ledger
      .tokenBalancesForAddress(activeAddress)
      .subscribe((balances: AccountBalancesEndpoint.DecodedResponse) => {
        resolve(balances);
      });
  });
};
