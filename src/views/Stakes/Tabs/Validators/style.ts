import styled from "styled-components";

import { COLORS } from "@globalStyle";

export const Validator = styled.div`
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  font-size: 0.825rem;

  color: ${COLORS.extralight};

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div:last-child {
      display: flex;
      align-items: center;
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

export const ValidatorInfo = styled.div`
  display: flex;
  align-items: center;

  & > span {
    background: ${COLORS.button};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: Mulish;
    font-weight: 800;
    font-size: 0.875rem;
    max-width: 10ch;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > div {
    width: 0.25rem;
    height: 0.25rem;
    background: white;
    border-radius: 50%;
    margin: 0 0.5rem;
  }
  & > svg {
    cursor: pointer;
    margin-left: 0.5rem;
  }
`;