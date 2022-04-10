import styled from "styled-components";

export const Phrases = styled.section`
  display: flex;

  & > div {
    width: 50%;
  }
`;

export const Phrase = styled.div`
  font-weight: bold;
  font-size: 1rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const RecoveryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h4 {
    font-size: 1rem;
  }
`;
