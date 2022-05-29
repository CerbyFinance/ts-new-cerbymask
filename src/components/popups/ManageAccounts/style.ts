import styled from "styled-components";

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-transform: uppercase;

  & > svg {
    margin-right: 0.75rem;
  }

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;
