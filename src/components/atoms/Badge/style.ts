import styled from "styled-components";

import { COLORS } from "@globalStyle";

export const Wrapper = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  border-radius: 0.75rem;
  background-color: white;
  padding: 0.5rem 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;

  &,
  span {
    color: ${COLORS.blue};
  }
`;
