import styled from "styled-components";

export const Wrapper = styled.div<{ button?: boolean }>`
  margin: ${({ button }) => (button ? 0 : "1.5rem 0")};
  display: flex;
  justify-content: center;
`;
