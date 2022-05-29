import styled from "styled-components";

import { COLORS } from "@globalStyle";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;

  h3 {
    margin-top: 1rem;
    font-size: 1.25rem;
  }
  p {
    margin-top: 1rem;
    font-size: 0.825rem;
    text-align: center;
    color: ${COLORS.extralight};
  }
`;
