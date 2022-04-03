import { useNetwork } from "./network";
import { useWallet } from "./wallet";
import { Network, Provider } from "./types";

export const useLocalProvider = (networksList: Network[]): Provider => {
  const networkProvider = useNetwork({ networks: networksList });
  const walletProvider = useWallet();

  return { network: networkProvider, wallet: walletProvider };
};
