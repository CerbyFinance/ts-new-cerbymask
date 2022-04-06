import React from "react";
import {
  AccountT,
  KeystoreT,
  MnemomicT as MnemonicT,
  WalletT,
} from "@radixdlt/application";

export type Network = Readonly<{
  name: string;
  url: string;
  xrd_rri?: string;
}>;
export interface UseNetworkProps {
  networks?: Network[];
  selected?: Network;
}
export interface NetworkProvider {
  networks: Network[];
  selectedNetwork: Network;
  setSelectedNetwork: React.Dispatch<React.SetStateAction<Network>>;
  addNetwork: (newNetwork: Network) => void;
}

export type WalletBalanceT = Readonly<{
  address: string;
  balance: string;
  xrd?: any;
}>;

export type WalletTokensT = Readonly<{
  address: string;
  tokens: [any];
}>;

export type WalletStakeT = Readonly<{
  address: string;
  initial: string;
  rewards: string;
  unstaking: string;
  staked: string;
  balance: string;
}>;

export interface Key {
  mnemonic: MnemonicT;
  keystore?: KeystoreT;
}
export interface Wallet {
  key?: Key;
  unlocked: Boolean;
  password?: string;

  currency: string;
  addresses: number;
  selectedAddress: number;

  radixWallet?: WalletT;
  radixPublicAddresses: AccountT[];
  radixBalances: WalletBalanceT[];
  radixStakes: WalletStakeT[];
  radixTokens: WalletTokensT[];

  network?: Network;
}
export interface WalletProvider {
  wallet: Wallet;
  restoreViewingAddress: () => void;
  addViewingAddress: (index: number) => void;
  monitorAddresses: (addresses: AccountT[]) => void;
  saveWallet: (keystore: KeystoreT, wallet: WalletT) => void;
  newWallet: () => void;
}

export interface Provider {
  network: NetworkProvider;
  wallet: WalletProvider;
}
