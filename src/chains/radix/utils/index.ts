import { KeystoreT } from "@radixdlt/application";
import { log } from "@utils";

export const loadKeystore = async () => {
  const result = await chrome.storage.local.get("keystore");
  log(`Got keystore: ${JSON.stringify(result.keystore, null, "\t")}`);
  return result.keystore as KeystoreT;
};
