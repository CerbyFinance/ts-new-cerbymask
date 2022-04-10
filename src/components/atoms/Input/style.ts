import styled from "styled-components";

import { InputSC } from "./types";

// should be InputSC but there is an error when listening to onFocus, onBlur
export const Wrapper = styled.div<any>`
  background: ${({ disabled }) =>
    disabled ? "rgba(255, 255, 255, 0.05)" : "transparent"};
  border: ${({ disabled }) =>
    disabled ? "none" : "2px solid rgba(255, 255, 255, 0.1)"};
  padding: 0.5rem 0.875rem;
  border-radius: 0.75rem;
`;
