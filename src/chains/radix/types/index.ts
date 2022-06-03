import { KeystoreT, Network } from "@radixdlt/application";
import { AxiosInstance } from "axios";

export * from "./api";
export * from "./token";
export * from "./stakes";

export interface NetworkApi {
  api: AxiosInstance;
  name: string;
}

export interface Node {
  url: string;
  hash: string;
}

export interface ConfigNetwork {
  url: string;
  xrd_rri: string;
  preamble: string;
}
