import styled from "styled-components";
import { StylesConfig } from "react-select";

import { COLORS } from "@globalStyle/colors";

export const selectStyles: StylesConfig = {
  menu: (provided) => ({
    ...provided,
    background: COLORS.background,
    border: "2px solid rgba(255, 255, 255, 0.1)",
    padding: "0.5rem 0.875rem",
    borderRadius: "0.75rem",
  }),
  container: (provided) => ({
    ...provided,
    borderRadius: ".75rem",
    margin: ".625rem 0",
  }),
  control: (provided) => ({
    ...provided,
    background: COLORS.background,
    padding: "0 .175rem",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.1) !important",
    borderRadius: "0.75rem",
    fontSize: ".875rem",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.1)",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  }),
};

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
