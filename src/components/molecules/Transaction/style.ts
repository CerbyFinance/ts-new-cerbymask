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
export const TxInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  svg {
    margin-right: 0.75rem;
  }
`;
export const TxTicker = styled.div`
  color: ${COLORS.extralight};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.675rem;
`;
export const TxBalance = styled.div`
  font-family: Mulish;
  font-weight: 800;
  font-size: 0.875rem;
`;
export const TxPrice = styled.div`
  font-size: 1rem;
  text-align: right;
  color: white;
`;
export const TxMessage = styled.div<{ isEncrypted?: boolean }>`
  max-width: 90%;
  cursor: ${({ isEncrypted }) => (isEncrypted ? "pointer" : "default")};
  margin-top: 0.25rem;
  background-color: ${COLORS.darkblue};
  border-radius: 8rem;
  padding: 0.5rem 1rem;
`;

export const TxIcon = styled.div`
  margin-right: 0.625rem;

  & > img {
    width: 2rem;
    height: 2rem;
  }
`;
