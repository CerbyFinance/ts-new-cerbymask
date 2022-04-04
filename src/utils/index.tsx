import { Wallet, WalletBalanceT, WalletStakeT } from "@crypto/radix/types";
import {
  MnemomicT,
  KeystoreT,
  SigningKeychain,
  SigningKeychainT,
  Wallet as RadixWallet,
  WalletT as RadixWalletT,
  Network as RadixNetwork,
  AccountT,
} from "@radixdlt/application";
import { Provider } from "@crypto/radix/types";

import BigNumber from "bignumber.js";
import { formatBigNumber } from "./formatters";

export function saveWalletForProvider(
  wallet: Wallet,
  provider: Provider
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    let walletResult =
      await SigningKeychain.byEncryptingMnemonicAndSavingKeystore({
        mnemonic: wallet.key?.mnemonic as MnemomicT,
        password: wallet.password as string,
        save: async (keystore: KeystoreT): Promise<void> => {
          chrome.runtime.sendMessage({
            title: "debug-log",
            data: ["debugging saveWalletForProvider", keystore, wallet],
          });
          // return Promise.resolve(provider.walletProvider.saveWallet(keystore, wallet));
        },
      });
    if (walletResult.isErr()) {
      console.log("Throwing error", walletResult);
      reject();
    }
    walletResult.match(
      async (signingKeychain: SigningKeychainT) => {
        const networkName = provider.network.selectedNetwork.name;
        const radixWallet = RadixWallet.create({
          signingKeychain: signingKeychain,
          network: networkName as RadixNetwork,
        });
        resolve(radixWallet);
      },
      async (error) => reject(error)
    );
  });
}

export function unlockWallet(
  wallet: Wallet,
  provider: Provider
): Promise<RadixWalletT> {
  return new Promise(async (resolve, reject) => {
    const walletResult = await SigningKeychain.byLoadingAndDecryptingKeystore({
      password: wallet.password as string,
      load: (): Promise<KeystoreT> => {
        return new Promise((resolve) =>
          resolve(wallet.key?.keystore as KeystoreT)
        );
      },
    });
    if (walletResult.isErr()) reject();

    walletResult.match(
      async (signingKeychain: SigningKeychainT) => {
        const networkName = provider.network.selectedNetwork.name.toUpperCase();
        const radixWallet = RadixWallet.create({
          signingKeychain: signingKeychain,
          network: networkName as RadixNetwork,
        });
        chrome.runtime.sendMessage({
          title: "debug-log",
          data: [networkName, signingKeychain, radixWallet],
        });
        resolve(radixWallet);
      },
      async (error) => reject(error)
    );
  });
}

export async function getXRDUSDBalances(radixPublicAddresses: AccountT[]) {
  const xrdValue = await getCurrentXRDUSDValue();
  return Promise.all(
    radixPublicAddresses.map(async (address) => {
      const balance = await getWalletBalance(address?.address.toString());

      const usdBalance = new BigNumber(balance.toString())
        .multipliedBy(parseFloat(xrdValue.bid))
        .shiftedBy(-18)
        .toFixed(4);
      return {
        address: address.address.toString(),
        balance: !balance ? 0 : usdBalance,
        xrd: !balance ? new BigNumber(0) : new BigNumber(balance),
      } as WalletBalanceT;
    })
  );
}

export async function getTokenBalances(radixPublicAddresses: AccountT[]) {
  return Promise.all(
    radixPublicAddresses.map(async (account: AccountT) => {
      const address = account.address.toString();
      return {
        address,
        tokens: await getAddressTokens(address),
      };
    })
  );
}

export async function getStakedPositions(radixPublicAddresses: AccountT[]) {
  const xrdValue = await getCurrentXRDUSDValue();
  return Promise.all(
    radixPublicAddresses.map(async (address) => {
      const stakedValue = new BigNumber(
        (await getStakes(address?.address.toString())).value
      );

      let staked = "";
      let usdBalance = "";
      if (stakedValue) {
        usdBalance = stakedValue
          .multipliedBy(parseFloat(xrdValue.bid))
          .shiftedBy(-18)
          .toFixed(4);
        staked = formatBigNumber(stakedValue.shiftedBy(-18));
      }
      return {
        address: address?.address.toString(),
        initial: "string",
        rewards: "string",
        unstaking: "string",
        staked: staked,
        balance: usdBalance,
      } as WalletStakeT;
    })
  );
}
