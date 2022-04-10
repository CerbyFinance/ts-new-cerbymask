import { CSSProperties } from "react";

import { Stake } from "@types";

export interface StakeProps {
  className?: string;
  style?: CSSProperties;
  data: Stake;
  add: (data: Stake) => void;
  reduce: (data: Stake) => void;
}
