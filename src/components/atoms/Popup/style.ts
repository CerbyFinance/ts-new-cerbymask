import styled from "styled-components";

import { COLORS, Z_INDEXES } from "@globalStyle";

export const Blur = styled.div<{ visible?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0.175rem);
  background: rgba(255, 255, 255, 0.1);
  z-index: ${({ visible }) => (visible ? Z_INDEXES.BLUR : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.375s ease-in-out;
`;

export const Content = styled.div<{ visible?: boolean }>`
  background: ${COLORS.darkblue};
  box-shadow: 0px -4px 10px 1px rgba(0, 242, 254, 0.05);
  border-radius: 0.75rem 0.75rem 0px 0px;
  padding: 1.5rem;
  width: 100%;

  position: absolute;
  left: 0;
  bottom: 0;
  z-index: ${({ visible }) => (visible ? Z_INDEXES.POPUP : 0)};
  transform: translateY(${({ visible }) => (visible ? "0" : "100%")});
  transition: transform 0.375s ease-in-out;
`;

export const Title = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  font-family: Mulish;
  font-weight: 800;
`;
