import styled from "styled-components";

import { COLORS } from "@globalStyle/colors";

export const Title = styled.h5`
  font-size: 0.75rem;
  text-align: center;
  margin-bottom: 0.625rem;
`;

export const Action = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  text-transform: uppercase;
  cursor: pointer;
  font-family: Mulish;
  font-weight: 800;
  color: ${COLORS.extralight};
  letter-spacing: 1px;
`;
