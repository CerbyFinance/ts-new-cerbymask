import { useEffect, useState } from "react";
import { NETWORKS_LIST } from "./config";
import { UseNetworkProps, Network, NetworkProvider } from "./types";

export const useNetwork = (props: UseNetworkProps): NetworkProvider => {
  const { networks: defaultNetworks, selected: defaultSelected } = props;

  const [networks, setNetworks] = useState<Network[]>(
    defaultNetworks && defaultNetworks.length > 0 ? defaultNetworks : []
  );
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(
    defaultSelected || NETWORKS_LIST.mainnet
  );

  useEffect(() => {
    chrome.storage.local.set({ network: selectedNetwork });
  }, [selectedNetwork]);

  return {
    networks,
    addNetwork: (newNetwork: Network) => {
      networks.findIndex((network) => network.name === newNetwork.name) === -1
        ? setNetworks((networks) => [...networks, newNetwork])
        : console.error(
            `Tried to add an existing network - ${newNetwork.name}`
          );
    },
    selectedNetwork,
    setSelectedNetwork,
  };
};
