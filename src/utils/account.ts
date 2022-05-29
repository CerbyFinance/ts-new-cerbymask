import { selectAccount, setAccounts } from "@store";
import { log } from "./dev";

export const getAccountsData = async () => {
  const { accounts } = await chrome.storage.local.get("accounts");
  const { selectedAccount } = await chrome.storage.local.get("selectedAccount");
  log("accounts storage");
  log(accounts);
  setAccounts(accounts);
  selectAccount(selectedAccount);
};
