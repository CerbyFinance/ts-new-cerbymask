import styled from "styled-components";

import { TextProps } from "./types";

import { COLORS } from "@globalStyle/colors";

export const Label = styled.label<Pick<TextProps, "bold">>`
  display: block;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
`;
export const Value = styled(Label)`
  color: ${COLORS.white};
  font-weight: ${({ bold }) => (bold ? "700" : "400")};
`;
