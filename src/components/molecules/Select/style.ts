import styled from "styled-components";

export const Wrapper = styled.div``;
export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.825rem;
`;
export const Container = styled.div`
  display: flex;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  position: relative;
  height: 2rem;
  cursor: default;

  svg {
    position: absolute;
    top: 0.5rem;
    right: 0.75rem;
    pointer-events: none;
  }
`;

export const Options = styled.div`
  overflow-y: scroll;
  max-height: 18.75rem;
  & > div {
    margin-bottom: 0.75rem;
  }
`;
