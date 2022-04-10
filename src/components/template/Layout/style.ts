import styled from "styled-components";

import { COLORS } from "@globalStyle/colors";

export const Layout = styled.section`
  background-color: ${COLORS.background};
  padding: 1.5rem;
  width: 22.5rem;
  min-height: 600px;
  position: relative;
`;
export const Footer = styled.footer<{ footerBackground: boolean }>`
  background: ${({ footerBackground }) =>
    footerBackground ? "rgba(255, 255, 255, 15%)" : "transparent"};
  padding: 1rem 1.5rem 1.25rem;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
