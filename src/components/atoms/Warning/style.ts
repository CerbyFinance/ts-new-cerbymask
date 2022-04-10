import styled from "styled-components";
import { COLORS } from "@globalStyle/colors";

export const Wrapper = styled.div`
  border-radius: 0.75rem;
  background-color: ${COLORS.orange};
  padding: 0.75rem;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 0.825rem;

  svg {
    margin-right: 0.75rem;
    opacity: 0.6;
  }
`;
