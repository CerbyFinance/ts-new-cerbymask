export * from "./convert";
export * from "./map";
export * from "./storage";
export * from "./wallet";

export const sliceAddress = (address: string, end?: number) =>
  `${address.slice(0, end || 12)}...${address.slice(-4)}`;
