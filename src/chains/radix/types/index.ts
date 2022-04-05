import { AxiosInstance } from "axios";

export * from "./tx";

export interface NetworkApi {
  api: AxiosInstance;
  name: string;
}
