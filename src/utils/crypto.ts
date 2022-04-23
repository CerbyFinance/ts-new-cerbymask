export const sliceAddress = (address: string) =>
  `${address.slice(0, 16)}...${address.slice(-4)}`;
