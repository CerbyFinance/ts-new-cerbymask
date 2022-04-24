import { AxiosInstance } from "axios";

export * from "./tx";
export * from "./api";
export * from "./token";

export interface NetworkApi {
  api: AxiosInstance;
  name: string;
}

export interface Network {
  name: string;
  url: string;
  xrd_rri: string;
}
