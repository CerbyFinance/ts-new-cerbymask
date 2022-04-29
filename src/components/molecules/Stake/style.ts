import styled from "styled-components";

import { COLORS } from "@globalStyle/colors";

export const Wrapper = styled.div<{ coinImg?: string }>`
  border-radius: 1.5rem;
  background-color: ${COLORS.blue};
  background-image: ${({ coinImg }) => (coinImg ? `url(${coinImg})` : "none")};
  background-position: right;
  background-repeat: no-repeat;
  padding: 1.25rem;
  position: relative;
  min-height: 12rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const Balance = styled.div`
  margin-top: 0.625rem;

  div {
    font-size: 2.25rem;
    &:last-child {
      font-size: 1rem;
    }

    span {
      color: rgba(255, 255, 255, 0.3);
    }
  }
`;

export const Footer = styled.footer`
  position: absolute;
  left: 1.25rem;
  bottom: 1.25rem;
  font-size: 0.875rem;

  display: flex;
`;
export const FooterAction = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 1.5rem;
  }

  svg {
    margin-right: 0.375rem;

    path {
      fill: rgba(255, 255, 255, 0.3);
    }
  }
`;
