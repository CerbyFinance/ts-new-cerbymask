import { createDomain, forward } from "effector";

import { Account } from "@types";

const account = createDomain();

export const $authenticated = account.createStore<boolean>(false);
export const authenticate = account.createEvent<boolean>();

$authenticated.on(authenticate, (_, auth) => auth);

// Temporary password storage (for wallet creation)
export const $password = account.createStore<string>("");
export const setPassword = account.createEvent<string>();
$password.on(setPassword, (_, password) => password);

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

export const addAccount = account.createEvent<Account>();
export const addAccountFx = account.createEffect(async (account: Account) => {
  const { accounts } = await chrome.storage.local.get("accounts");

  let updatedAccounts;
  if (!accounts) {
    updatedAccounts = [account];
  } else {
    updatedAccounts = [...accounts, account];
  }
  await chrome.storage.local.set({ accounts: updatedAccounts });
  await selectAccountFx(account);

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
