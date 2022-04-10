import styled from "styled-components";

import { Stake as DefaultStake } from "@components/molecules";

export const Stake = styled(DefaultStake)`
  &:not(:last-child) {
    margin-bottom: 0.625rem;
  }
`;
