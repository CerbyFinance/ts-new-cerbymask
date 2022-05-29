import { firstValueFrom } from "rxjs";
import { AccountAddressT } from "@radixdlt/account";
import {
  SimpleExecutedTransaction,
  TransactionHistory,
} from "@radixdlt/application";
import { AccountBalancesEndpoint } from "@radixdlt/application/dist/api/open-api/_types";

import { radixApi } from ".";
import { log } from "@utils";

export const fetchActiveAddress = async (): Promise<AccountAddressT> => {
  return await firstValueFrom(radixApi.activeAddress);
};

export const fetchTokenBalances = async ({
  address,
}: {
  address: AccountAddressT;
}): Promise<AccountBalancesEndpoint.DecodedResponse> => {
  const balances = (await firstValueFrom(
    radixApi.ledger.tokenBalancesForAddress(address)
  )) as AccountBalancesEndpoint.DecodedResponse;
  return balances;
};

export const getTxHistory = async (payload: {
  address: AccountAddressT;
  size: number;
}): Promise<SimpleExecutedTransaction[]> => {
  const txs = (await firstValueFrom(
    radixApi.ledger.transactionHistory(payload)
  )) as TransactionHistory;
  log("txs");
  log(txs);
  return txs.transactions;
};
