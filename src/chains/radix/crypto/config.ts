import { Network } from "./types";

export const NETWORKS_LIST: Record<string, Network> = {
  mainnet: {
    name: "mainnet",
    url: "https://mainnet.radixdlt.com/",
    xrd_rri: "xrd_rr1qy5wfsfh",
  },
  stokenet: {
    name: "stokenet",
    url: "https://stokenet.radixdlt.com/",
    xrd_rri: "xrd_tr1qyf0x76s",
  },
};

export const XRD_RRI = ["xrd_rr1qy5wfsfh", "xrd_tr1qyf0x76s"];
