import styled from "styled-components";

import { COLORS } from "@globalStyle/colors";

export const OptionAccount = styled.div`
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.825rem;
`;

export const OptionValidator = styled.div`
  cursor: pointer;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  font-size: 0.825rem;

  color: ${COLORS.extralight};

  header {
    display: flex;
    align-items: center;

    & > span {
      background: ${COLORS.button};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: Mulish;
      font-weight: 800;
      font-size: 0.875rem;
    }

    & > div {
      width: 0.25rem;
      height: 0.25rem;
      background: white;
      border-radius: 50%;
      margin: 0 0.5rem;
    }
  }

  main {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div {
      &:last-child {
        text-align: right;
      }

      & > div:first-child {
        margin-bottom: 0.25rem;
      }
    }
  }
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: 1.5rem;
  padding: 0 1.5rem;
  left: 0;
  width: 100%;
`;
