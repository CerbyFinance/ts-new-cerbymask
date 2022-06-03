import styled from "styled-components";
import { COLORS, MIXINS, Z_INDEXES } from "@globalStyle";

export const Wrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEXES.MENU};
  background: ${COLORS.background};
  padding: 1.5rem;
  font-size: 1rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;

    & > svg {
      cursor: pointer;
    }
  }

  main {
    & > div {
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      svg {
        margin-right: 1rem;
      }
      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      & > div {
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 0.825rem;
    cursor: pointer;

    svg {
      margin-right: 0.5rem;
    }
    span {
      font-weight: 800;
      letter-spacing: 1px;
      ${MIXINS.textGradient}
    }
  }
`;
