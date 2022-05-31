import { createDomain, forward } from "effector";

import { Account } from "@types";

import { setActiveAddress } from "@chains/radix/store";

const account = createDomain();

export const $authenticated = account.createStore<boolean>(false);
export const authenticate = account.createEvent<boolean>();

$authenticated.on(authenticate, (_, auth) => auth);

export const $accounts = account.createStore<Account[]>([]);
export const setAccounts = account.createEvent<Account[]>();
export const setAccountsFx = account.createEffect(
  async (accounts: Account[]) => {
    await chrome.storage.local.set({ accounts });
    return accounts;
  }
);
forward({
  from: setAccounts,
  to: setAccountsFx,
});
$accounts.on(setAccountsFx.doneData, (_, accounts) => accounts);

$accounts.watch((accounts) => {
  chrome.runtime.sendMessage({
    title: "debug-log",
    data: "accounts",
  });
  chrome.runtime.sendMessage({
    title: "debug-log",
    data: accounts,
  });
});

export const $selectedAccount = account.createStore<Account | null>(null);
export const selectAccount = account.createEvent<Account>();
export const selectAccountFx = account.createEffect(
  async (account: Account) => {
    await chrome.storage.local.set({ selectedAccount: account });
    return account;
  }
);
forward({
  from: selectAccount,
  to: selectAccountFx,
});
$selectedAccount.on(selectAccountFx.doneData, (_, account) => account);

export const addAccount = account.createEvent<Account>();
export const addAccountFx = account.createEffect(async (account: Account) => {
  const { accounts } = await chrome.storage.local.get("accounts");

  let updatedAccounts;
  if (!accounts) {
    updatedAccounts = [account];
  } else {
    const uniqueAccounts = accounts.filter(
      (oldAccount: Account) => oldAccount.address !== account.address
    );
    updatedAccounts = [...uniqueAccounts, account];
  }
  await chrome.storage.local.set({ accounts: updatedAccounts });

  return account;
});
$accounts.on(addAccountFx.doneData, (accounts, account) => [
  ...accounts,
  account,
]);
forward({
  from: addAccount,
  to: addAccountFx,
});
forward({
  from: addAccountFx.done,
  to: setActiveAddress,
});
forward({
  from: addAccountFx.doneData,
  to: selectAccount,
});

export const removeAccount = account.createEvent<string>();
export const removeAccountFx = account.createEffect(async (address: string) => {
  const { accounts } = await chrome.storage.local.get("accounts");
  await chrome.storage.local.set({
    accounts: accounts.filter(
      (account: Account) => account.address !== address
    ),
  });
  return account;
});
forward({
  from: removeAccount,
  to: removeAccountFx,
});

$accounts.on(removeAccount, (accounts, address) =>
  accounts.filter((account) => account.address === address)
);
