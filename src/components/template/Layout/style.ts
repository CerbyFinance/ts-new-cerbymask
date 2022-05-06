import styled from "styled-components";

import { COLORS } from "@globalStyle/colors";

export const Layout = styled.section`
  background: ${COLORS.background};
  padding: 1.5rem;
  width: 22.5rem;
  min-height: 600px;
  position: relative;
`;
export const Header = styled.header`
  margin-bottom: 1rem;

  svg {
    cursor: pointer;
  }
`;
export const Footer = styled.footer`
  padding: 1rem 1.5rem 1.25rem;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
