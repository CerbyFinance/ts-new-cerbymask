import styled from "styled-components";

export const Account = styled.div`
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.825rem;

  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }
`;
