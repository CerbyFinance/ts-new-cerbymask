import { UInt256 } from "@radixdlt/uint256";

export interface BalanceToken {
  rri: string;
  value: UInt256;
  ticker: string;
}

export interface ExchangeToken {
  price: number;
  dailyChange: number;
}
export interface ExchangeData {
  [key: string]: ExchangeToken;
}

export interface Token extends BalanceToken, ExchangeToken {
  usdBalance: number;
}

export type TokenWithIcon = Token & { icon: JSX.Element };
