import toast from "react-hot-toast";
import { firstValueFrom, zip } from "rxjs";
import { AccountAddressT } from "@radixdlt/account";
import {
  AccountT,
  Network,
  SimpleExecutedTransaction,
  TransactionHistory,
  SigningKeychain,
} from "@radixdlt/application";
import { AccountBalancesEndpoint } from "@radixdlt/application/dist/api/open-api/_types";

import { authenticate } from "@store";

import { log } from "@utils";
import {
  getAccountKeystore,
  getSelectedNode,
  getStorage,
  getAccountsIndex,
  setAccountsIndex,
} from "@chains/radix/utils";

import { api } from "./api";

const { byLoadingAndDecryptingKeystore } = SigningKeychain;

export const login = async () => {
  const { masterPassword } = await getStorage(["masterPassword"]);

  const signingKeychainResult = await byLoadingAndDecryptingKeystore({
    password: masterPassword,
    load: getAccountKeystore,
  });
  if (signingKeychainResult.isErr()) {
    log(signingKeychainResult.error);
    log("Failed to connect to the API. Invalid credentials");
    toast.error("Invalid password", {
      style: {
        background: "#333",
        color: "white",
        borderRadius: ".5rem",
      },
    });
    throw new Error();
  }

  const selectedNode = await getSelectedNode(
    signingKeychainResult._unsafeUnwrap()
  );
  await api.connect(selectedNode.url);
  authenticate(true);

  await api.login(masterPassword, getAccountKeystore);
};

const dataLoadedObservable = zip(api.activeAccount, api.accounts);
export const waitUntilDataLoaded = async () =>
  firstValueFrom(dataLoadedObservable);

export const fetchNetworkId = async (): Promise<Network> => {
  return await firstValueFrom(api.ledger.networkId());
};

export const fetchActiveAddress = async (): Promise<AccountAddressT> => {
  return await firstValueFrom(api.activeAddress);
};

export const fetchActiveAccount = async (): Promise<AccountT> => {
  return await firstValueFrom(api.activeAccount);
};

export const fetchTokenBalances = async ({
  address,
}: {
  address: AccountAddressT;
}): Promise<AccountBalancesEndpoint.DecodedResponse> => {
  const balances = (await firstValueFrom(
    api.ledger.tokenBalancesForAddress(address)
  )) as AccountBalancesEndpoint.DecodedResponse;
  return balances;
};

export const getTxHistory = async (payload: {
  address: AccountAddressT;
  size: number;
}): Promise<SimpleExecutedTransaction[]> => {
  const txs = (await firstValueFrom(
    api.ledger.transactionHistory(payload)
  )) as TransactionHistory;
  log("txs");
  log(txs);
  return txs.transactions;
};

export const deriveNextAccount = async () => {
  await api.deriveNextAccount({ alsoSwitchTo: true });
  log("new account");
  const newAccount = await firstValueFrom(api.activeAccount);
  log(newAccount.address.toString());
};

export const fetchAccountsForNetwork = async (network: Network) => {
  const index = await getAccountsIndex(network);
  return await firstValueFrom(api.restoreLocalHDAccountsToIndex(index + 2));
};
