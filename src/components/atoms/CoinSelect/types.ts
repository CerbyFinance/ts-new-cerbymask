import { Token } from "@chains/radix/types";

export interface CoinSelectProps {
  tokens: Token[];
  onChange: (token: Token) => void;
}
