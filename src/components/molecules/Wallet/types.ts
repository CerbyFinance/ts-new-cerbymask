import React, { CSSProperties, ReactNode } from "react";

import { Wallet } from "@types";

export interface WalletAction {
  icon: ReactNode;
  onClick: (data: Wallet) => void;
}
export interface WalletButton extends WalletAction {
  name: string;
}

export interface WalletProps {
  className?: string;
  style?: CSSProperties;
  data: Wallet;
  buttons?: WalletButton[];
  actions?: WalletAction[];
}
