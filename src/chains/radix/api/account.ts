import toast from "react-hot-toast";
import { firstValueFrom, zip } from "rxjs";
import { AccountAddressT } from "@radixdlt/account";
import {
  AccountT,
  Network,
  SimpleExecutedTransaction,
  TransactionHistory,
  SigningKeychain,
  AccountsT,
  MnemomicT,
} from "@radixdlt/application";
import { AccountBalancesEndpoint } from "@radixdlt/application/dist/api/open-api/_types";

import { log } from "@utils";
import {
  getAccountKeystore,
  getSelectedNode,
  getStorage,
  getAccountsIndex,
  setAccountsIndex,
  initWallet,
  fetchAllData,
  setStorage,
} from "@chains/radix/utils";
import { selectAccount, setAccountsFx } from "@chains/radix/store";

import { api } from "./api";

const { byLoadingAndDecryptingKeystore } = SigningKeychain;

export const login = async () => {
  const { masterPassword, selectedAddress } = await getStorage([
    "masterPassword",
    "selectedAddress",
  ]);

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
  await api.login(masterPassword, getAccountKeystore);

  if (!selectedAddress) {
    const activeAddress: AccountAddressT = await firstValueFrom(
      api.activeAddress
    );
    await setStorage({ selectedAddress: activeAddress.toString() });
  }
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
  const network = await fetchNetworkId();
  const index = await getAccountsIndex(network);
  await setAccountsIndex(index + 1, network);
  await api.deriveNextAccount({ alsoSwitchTo: true });
  await setAccountsFx();
  const address = await fetchActiveAddress();
  await selectAccount(address.toString());
  await initWallet();
};

export const fetchAccounts = async (): Promise<AccountsT> => {
  const accounts: AccountsT = await firstValueFrom(api.accounts);
  log("first value from accs");
  log(accounts);
  return accounts;
};

export const restoreLocalHDAccountsToIndex = async (
  network: Network
): Promise<AccountsT> => {
  const index = await getAccountsIndex(network);
  return await firstValueFrom(api.restoreLocalHDAccountsToIndex(index + 1));
};

export const switchAccount = async (account: AccountT): Promise<AccountT> => {
  await api.switchAccount({ toAccount: account });
  await fetchAllData();
  return account;
};

export const revealMnemonic = async (): Promise<MnemomicT> => {
  const mnemonic: MnemomicT = await firstValueFrom(api.revealMnemonic());
  return mnemonic;
};
