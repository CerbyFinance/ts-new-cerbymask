import styled from "styled-components";

import { COLORS } from "@globalStyle";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  & > svg {
    cursor: pointer;
  }
`;
export const NetworkSelect = styled.div`
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.375rem 0.75rem;
  display: flex;
  align-items: center;
  font-size: 0.825rem;

  div:first-child {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: ${COLORS.green};
    margin-right: 0.5rem;
  }
  div:nth-child(2) {
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: white;
    opacity: 0.5;
    margin: 0 0.5rem;
  }
`;

export const Footer = styled.footer`
  background-color: ${COLORS.darkblue};
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0px -4px 10px 1px rgba(0, 242, 254, 0.05);
  padding: 1.5rem;
  margin-top: 1.5rem;
  min-height: 22.5rem;
`;

export const ItemsDivider = styled.div`
  max-height: 15.25rem;
  overflow-y: scroll;
  & > div:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const OptionNetwork = styled.div`
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.825rem;

  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }
`;
