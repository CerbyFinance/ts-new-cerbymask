import { AccountAddressT } from "@radixdlt/account";
import { UInt256 } from "@radixdlt/uint256";

export interface Tx {
  rri: string;
  ticker: string;
  amount: UInt256;
  usdAmount: number;
  to: AccountAddressT;
  date: number;
  type: "send" | "receive";
}

export type TxWithIcon = Tx & { icon: JSX.Element };
