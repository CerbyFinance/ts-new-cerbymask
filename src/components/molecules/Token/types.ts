import { TOKENS } from "@tokens";

export interface Token {
  key: keyof typeof TOKENS;
  balance: string;
  priceChange: number;
  currentPrice: number;
}
export interface TokenProps {
  data: Token;
  style?: React.CSSProperties;
  className?: string;
}
