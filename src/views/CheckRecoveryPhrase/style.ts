import styled from "styled-components";

export const Form = styled.div`
  margin-top: 1rem;

  & > div {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    & > span {
      font-size: 0.875rem;
    }

    & > div {
      width: 100%;
      margin-left: 0.5rem;
    }
  }
`;
