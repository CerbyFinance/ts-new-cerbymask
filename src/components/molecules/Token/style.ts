import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
`;
export const TokenInfo = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.625rem;
  }
`;
export const TokenPrice = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  text-align: right;
  color: rgba(255, 255, 255, 0.4);

  span {
    display: block;
  }
`;
