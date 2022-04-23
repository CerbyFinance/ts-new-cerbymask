import { KeystoreT } from "@radixdlt/application";
import { log } from "@utils";

export const loadKeystore = async () => {
  const result = await chrome.storage.local.get("keystore");
  log(`Got keystore: ${JSON.stringify(result.keystore, null, "\t")}`);
  return result.keystore as KeystoreT;
};

export const setStorage = async (key: string, value: any) => {
  const { radix: radixStorage } = await chrome.storage.local.get("radix");
  await chrome.storage.local.set({ radix: { ...radixStorage, [key]: value } });
};
