import React from "react";
import { HashLoader } from "react-spinners";

import * as S from "./style";

export const Loader = () => {
  return (
    <S.Wrapper>
      <HashLoader color="white" size={30} />
    </S.Wrapper>
  );
};
