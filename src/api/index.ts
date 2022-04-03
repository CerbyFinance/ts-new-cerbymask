import axios from "axios";

const newApi = (baseURL: string) =>
  axios.create({
    baseURL,
    headers: {
      "X-Radixdlt-Target-Gw-Api": "1.0",
      "Content-Type": "application/json",
    },
  });

export const mainnetGateway = newApi("https://mainnet.radixdlt.com/");
export const stokenetGateway = newApi("https://stokenet.radixdlt.com");
