import { useState } from "react";
import { AccountT, WalletT } from "@radixdlt/application";
import { KeystoreT } from "@radixdlt/crypto";

import { Wallet, WalletProvider } from "./types";
import { generateKey } from "./key";

const local = chrome.storage.local;

const generateNewWallet = () => ({
  key: generateKey(),
  unlocked: false,
  selectedAddress: 0,
  addresses: 2,
  radixPublicAddresses: [],
  radixBalances: [],
  radixStakes: [],
  radixTokens: [],
  currency: "USD",
});

export const useWallet = (): WalletProvider => {
  const [wallet, setWallet] = useState<Wallet>(generateNewWallet());

  return {
    wallet,
    restoreViewingAddress: () => {
      setWallet((wallet) => ({ ...wallet, addresses: 2, address: 0 }));
    },
    addViewingAddress: (index: number) => {
      setWallet((wallet) => ({
        ...wallet,
        addresses: wallet.addresses + 1,
        address: index,
      }));
    },
    monitorAddresses: (addresses: AccountT[]) => {
      local.get(["monitor"], (monitor: any) => {
        const error = chrome.runtime.lastError;
        if (error) throw new Error("Error when monitoring addresses");

        let addressesString = addresses.map((account) =>
          account.address.toString()
        );
        monitor["monitor"] = addressesString;

        local.set({ monitor: monitor["monitor"] });
      });
    },
    saveWallet: (keystore: KeystoreT, wallet: WalletT) => {
      setWallet((wallet) => ({
        ...wallet,
        ...(wallet.key && { key: { ...wallet.key, keystore } }),
      }));
      console.log("setting wallet", wallet);
    },
    newWallet: () => {
      setWallet(generateNewWallet());
      local.set({ monitor: [] });
    },
  };
};
