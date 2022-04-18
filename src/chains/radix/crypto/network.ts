import { useEffect, useState } from "react";

import { NETWORKS_LIST } from "./config";

export const useNetwork = (props: any) => {
  const { selected: defaultSelected } = props;

  const [network, setNetwork] = useState(
    defaultSelected || NETWORKS_LIST.mainnet
  );

  useEffect(() => {
    chrome.storage.local.set({ network });
  }, [network]);

  return {
    network,
    setNetwork,
  };
};
