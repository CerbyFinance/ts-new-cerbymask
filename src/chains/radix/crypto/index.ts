import { useNetwork } from "./network";
import { useWallet } from "./wallet";

export * from "./config";

export const useRadixProvider = (networksList: any[]) => {
  const networkProvider = useNetwork({ networks: networksList });
  const walletProvider = useWallet();

  return { network: networkProvider, wallet: walletProvider };
};
