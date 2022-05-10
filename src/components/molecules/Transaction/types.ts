import { TxWithIcon } from "@chains/radix/types";

export interface TransactionProps {
  data: TxWithIcon;
  style?: React.CSSProperties;
  className?: string;
}
