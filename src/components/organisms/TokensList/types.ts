import { TokenWithIcon } from "@chains/radix/types";

export interface TokensListProps {
  tokens: TokenWithIcon[];
  header: string | React.ReactNode;
  style?: React.CSSProperties;
}
