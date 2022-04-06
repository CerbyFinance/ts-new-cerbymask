import { NetworkApi } from "@types/radix";

export const getWalletFunds = async (network: NetworkApi, options: any) => {
  const { name, api } = network;
  const { address } = options;

  const params = {
    network_identifier: {
      network: name,
    },
    account_identifier: {
      address,
    },
  };

  try {
    const response = await api.get("account/balances", { params });
    chrome.runtime.sendMessage({
      title: "debug-log",
      data: ["getWalletFunds", response],
    });
  } catch (e) {
    throw new Error("getWalletFunds failed");
  }
};

export const getStakePositions = async (network: NetworkApi, options: any) => {
  const { api } = network;
  const { address } = options;

  try {
    const response = await api.get("account.get_stake_positions", {
      params: { address },
    });
    chrome.runtime.sendMessage({
      title: "debug-log",
      data: ["getStakePositions", response],
    });
  } catch (e) {
    throw new Error("getStakePositions failed");
  }
};
