import styled from "styled-components";

import { TextSC } from "./types";

import { COLORS } from "@globalStyle/colors";

export const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.825rem;
`;
export const ValueInput = styled.input<TextSC>`
  font-size: 0.875rem;
  color: ${({ transparent }) =>
    transparent ? "rgba(255, 255, 255, 0.4)" : COLORS.white};
  width: 100%;
  font-weight: ${({ bold }) => (bold ? "700" : "400")};
`;
export const ValueTextarea = styled.textarea<TextSC>`
  font-size: 0.875rem;
  color: ${({ transparent }) =>
    transparent ? "rgba(255, 255, 255, 0.4)" : COLORS.white};
  width: 100%;
  font-weight: ${({ bold }) => (bold ? "700" : "400")};
`;
