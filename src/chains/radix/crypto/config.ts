import { HRP, Network } from "@radixdlt/application";

export const NETWORKS_LIST = {
  [Network.MAINNET]: {
    url: "https://mainnet.radixdlt.com/",
    xrd_rri: "xrd_rr1qy5wfsfh",
    preamble: HRP[Network.MAINNET].account,
  },
  [Network.STOKENET]: {
    url: "https://stokenet.radixdlt.com/",
    xrd_rri: "xrd_tr1qyf0x76s",
    preamble: HRP[Network.STOKENET].account,
  },
};

export const DEFAULT_NETWORK = Network.STOKENET;
