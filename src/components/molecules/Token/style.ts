import styled from "styled-components";

import { COLORS } from "@globalStyle";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
`;
export const TokenInfo = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.75rem;
  }
`;
export const TokenTicker = styled.div`
  color: ${COLORS.extralight};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.675rem;
`;
export const TokenBalance = styled.div`
  font-family: Mulish;
  font-weight: 800;
  font-size: 0.875rem;
`;
export const TokenPrice = styled.div`
  font-size: 1rem;
  text-align: right;
  color: white;
`;

export const TokenIcon = styled.div`
  margin-right: 0.625rem;

  & > img {
    width: 2rem;
    height: 2rem;
  }
`;
