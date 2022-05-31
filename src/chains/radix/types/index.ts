import { KeystoreT } from "@radixdlt/application";
import { AxiosInstance } from "axios";

export * from "./api";
export * from "./token";
export * from "./stakes";

export interface NetworkApi {
  api: AxiosInstance;
  name: string;
}

export interface Network {
  name: string;
  url: string;
  xrd_rri: string;
}

export interface WalletCreationData {
  password: string;
  mnemonic: string[];
  keystore: KeystoreT | null;
}
