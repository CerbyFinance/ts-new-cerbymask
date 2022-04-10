import styled from "styled-components";

import { Wallet as DefaultWallet } from "@components/molecules";

export const Wallet = styled(DefaultWallet)`
  &:not(:last-child) {
    margin-bottom: 0.625rem;
  }
`;
