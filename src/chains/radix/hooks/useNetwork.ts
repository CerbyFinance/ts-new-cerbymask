import React, { useEffect, useState } from "react";

import { NETWORKS_LIST, Network } from "@chains/radix";

export const useNetwork = (
  defaultNetwork?: Network
): [Network, React.Dispatch<React.SetStateAction<Network>>] => {
  const [network, changeNetwork] = useState(
    defaultNetwork || NETWORKS_LIST.mainnet
  );

  useEffect(() => {
    // chrome.local.storage.set network
  }, [network]);

  return [network, changeNetwork];
};
