import styled from "styled-components";

import { COLORS } from "@globalStyle";

export const Wrapper = styled.div`
  border-radius: 0.5rem;
  background: ${COLORS.button};
  padding: 1.25rem;
  position: relative;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;
export const HeaderAccount = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.825rem;

  & > div {
    width: 0.25rem;
    height: 0.25rem;
    background: rgba(255, 255, 255, 0.5);
    margin: 0 0.5rem;
    border-radius: 50%;
  }

  & > span,
  & > svg {
    opacity: 0.5;
  }

  & > svg {
    margin-left: 0.5rem;
    cursor: pointer;
  }
`;
export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  top: -0.5rem;

  div {
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 1.25rem;
    }
  }
`;

export const Balance = styled.div`
  font-size: 1.75rem;
  margin-top: 1rem;
  font-family: Mulish;
  font-weight: 800;
`;

export const Footer = styled.footer`
  margin-top: 1.5rem;
  font-size: 0.75rem;
  font-family: Mulish;
  font-weight: 800;
  text-transform: uppercase;

  display: flex;
`;
export const FooterAction = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  letter-spacing: 1px;

  &:not(:last-child) {
    margin-right: 1.5rem;
  }

  svg {
    margin-right: 0.375rem;
  }
`;
