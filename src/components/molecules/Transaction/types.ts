import { SimpleExecutedTransaction } from "@radixdlt/application";

export interface TransactionProps {
  data: SimpleExecutedTransaction;
  style?: React.CSSProperties;
  className?: string;
}
