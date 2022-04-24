import styled from "styled-components";

export const CoinOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
export const CoinBalance = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);

  strong {
    display: block;
    font-size: 0.875rem;
    color: white;
  }
`;
export const CoinIcon = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 0.875rem;

  img {
    margin-left: 0.675rem;
    width: 2rem;
    height: 2rem;
  }
`;
