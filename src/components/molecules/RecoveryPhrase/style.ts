import styled from "styled-components";

export const Phrases = styled.section`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;

  & > div {
    width: 50%;
  }
`;

export const Phrase = styled.div`
  font-size: 0.875rem;
  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`;
