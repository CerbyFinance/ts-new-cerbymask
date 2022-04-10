// WIP type for mocking purposes
export interface Wallet {
  address: string;
  usdBalance: number;
  isActive?: boolean;
}

export interface Stake {
  address: string;
  name: string;
  ticker: string;
  amount: number;
  usdEquivalent: number;
  coinImg: string;
}
