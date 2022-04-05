import { useNetwork } from "./network";
import { useWallet } from "./wallet";
import { Network, Provider } from "./types";

export * from "./config";
export * from "./types";

export const useRadixProvider = (networksList: Network[]): Provider => {
  const networkProvider = useNetwork({ networks: networksList });
  const walletProvider = useWallet();

  return { network: networkProvider, wallet: walletProvider };
};
