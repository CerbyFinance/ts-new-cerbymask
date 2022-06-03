import styled from "styled-components";

import { COLORS } from "@globalStyle";

export const OptionAccount = styled.div`
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.825rem;
`;

export const MessageLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div:first-child span {
    color: ${COLORS.extralight};
  }

  & > div:last-child {
    display: flex;
    align-items: center;
  }
`;
