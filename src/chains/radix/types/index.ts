import { AxiosInstance } from "axios";

export * from "./tx";
export * from "./api";

export interface NetworkApi {
  api: AxiosInstance;
  name: string;
}
