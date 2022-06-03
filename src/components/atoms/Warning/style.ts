import styled from "styled-components";
import { COLORS } from "@globalStyle";

export const Wrapper = styled.div`
  border-radius: 0.5rem;
  border: 1px solid ${COLORS.orange};
  background: rgba(254, 139, 0, 0.1);
  color: ${COLORS.orange};
  padding: 1rem;
  display: flex;
  font-size: 0.825rem;

  svg {
    margin-right: 0.75rem;
  }
`;
