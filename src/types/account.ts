import { KeystoreT } from "@radixdlt/application";

export interface Account {
  address: string;
  mnemonic: string[];
  keystore: KeystoreT;
}
