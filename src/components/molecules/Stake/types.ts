import { CSSProperties } from "react";

import { Stake } from "@types";

export interface StakeProps {
  className?: string;
  style?: CSSProperties;
  data: Stake;
  onUnstake: (data: Stake) => void;
}
