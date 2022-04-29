// WIP type for mocking purposes
export interface Wallet {
  address: string;
  usdBalance: number;
  isActive?: boolean;
}

export interface Stake {
  address: string;
  ticker: string;
  amount: string;
  usdEquivalent: number;
  coinImg?: string;
  validator: string;
  rri: string;
  isPending?: boolean;
}
