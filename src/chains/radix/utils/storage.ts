import { KeystoreT } from "@radixdlt/application";

import { log } from "@utils";

export const getAccountKeystore = async () => {
  const { selectedAccount } = await chrome.storage.local.get("selectedAccount");
  log(`Got keystore: ${JSON.stringify(selectedAccount.keystore, null, "\t")}`);
  return selectedAccount.keystore as KeystoreT;
};

export const setStorage = async (key: string, value: any) => {
  const { radix: radixStorage } = await chrome.storage.local.get("radix");
  await chrome.storage.local.set({ radix: { ...radixStorage, [key]: value } });
};
