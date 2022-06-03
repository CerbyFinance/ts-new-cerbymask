import React from "react";
import { HashLoader } from "react-spinners";

import { LoaderProps } from "./types";

import * as S from "./style";

const DEFAULT_SIZE = 30;
const BUTTON_SIZE = 16;

export const Loader = (props: LoaderProps) => {
  const { button } = props;
  return (
    <S.Wrapper button={button}>
      <HashLoader color="white" size={button ? BUTTON_SIZE : DEFAULT_SIZE} />
    </S.Wrapper>
  );
};
