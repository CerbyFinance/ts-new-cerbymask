import styled from "styled-components";

import { COLORS } from "@globalStyle/colors";
import { zIndexes } from "@globalStyle/zIndexes";

export const Blur = styled.div<{ visible?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0.175rem);
  background: rgba(255, 255, 255, 0.1);
  z-index: ${zIndexes.BLUR};
  pointer-events: none;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.375s ease-in-out;
`;

export const Wrapper = styled.div<{ visible?: boolean }>`
  background: ${COLORS.darkblue};
  box-shadow: 0px -4px 10px 1px rgba(0, 242, 254, 0.05);
  border-radius: 0.75rem 0.75rem 0px 0px;
  padding: 1.5rem;
  width: 100%;

  position: absolute;
  left: 0;
  bottom: 0;
  z-index: ${zIndexes.POPUP};
  transform: translateY(${({ visible }) => (visible ? "0" : "100%")});
  transition: transform 0.375s ease-in-out;
`;

export const Title = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
`;
