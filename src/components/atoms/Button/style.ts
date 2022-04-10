import styled from "styled-components";

import { COLORS } from "@globalStyle/colors";
import { ButtonProps } from "./types";

export const Wrapper = styled.div<Pick<ButtonProps, "disabled">>`
  background: ${COLORS.blue};
  border-radius: 0.75rem;
  width: 100%;
  padding: 0.75rem 0;
  text-align: center;
  color: white;
  text-transform: uppercase;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? "0.4" : "1")};
  font-weight: 700;
`;
