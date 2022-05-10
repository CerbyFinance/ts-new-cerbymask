import styled from "styled-components";

import { COLORS } from "@globalStyle/colors";

export const Wrapper = styled.div``;
export const Tab = styled.div<{ isActive?: boolean }>`
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-weight: 800;
  font-family: Mulish;
  font-size: 0.825rem;
  color: white;
  opacity: 0.5;
  position: relative;
  border-radius: 0.5rem;

  ${({ isActive }) =>
    isActive &&
    `
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: .5rem;
        padding: 1px;
        background: ${COLORS.button};
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
                mask-composite: exclude;
        pointer-events: none;
    }
    background: ${COLORS.button};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 1;
  `}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  overflow-y: scroll;
  white-space: nowrap;

  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
`;
export const Content = styled.main`
  margin-top: 1rem;
`;
