import { Radix } from "@radixdlt/application";

export type Action<T = any> = {
  api: RadixApiType;
  payload?: T;
};

export type RadixApiType = ReturnType<typeof Radix.create>;

export interface RadixApiOpts {
  url?: string;
  password: string;
}

export interface RadixApiContextValue {
  api: RadixApiType;
  connect: (password: string) => Promise<void>;
  connected: boolean;
}
