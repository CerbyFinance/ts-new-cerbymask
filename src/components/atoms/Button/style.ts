import styled from "styled-components";

import { COLORS } from "@globalStyle/colors";
import { ButtonProps } from "./types";

export const Wrapper = styled.div<Pick<ButtonProps, "disabled">>`
  background: ${COLORS.button};
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.75rem 0;
  text-align: center;
  color: white;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? "0.8" : "1")};
  font-family: Mulish;
  font-size: 0.825rem;
  font-weight: 800;
`;
