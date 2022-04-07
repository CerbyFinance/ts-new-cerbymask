import styled from "styled-components";

import { Token as DefaultToken } from "@components/molecules";

export const Title = styled.h4`
  font-size: 0.875rem;
  margin-bottom: 0.625rem;
`;

export const Token = styled(DefaultToken)`
  &:not(:last-child) {
    margin-bottom: 0.375rem;
  }
`;
