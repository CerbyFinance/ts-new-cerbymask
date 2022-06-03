import { KeystoreT, Radix } from "@radixdlt/application";

export type RadixApiType = ReturnType<typeof Radix.create>;

export interface StoreAccountOpts {
  mnemonic: string[];
  keystore: KeystoreT;
}

export interface RadixApiContextValue {
  api: RadixApiType;
  connect: (password: string) => Promise<void>;
  connected: boolean;
}
