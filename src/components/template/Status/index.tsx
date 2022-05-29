import React from "react";

import { StatusProps } from "./types";

import { Layout } from "@components/template";

import * as S from "./style";

export const Status = (props: StatusProps) => {
  const { icon, title, paragraph, button } = props;
  return (
    <Layout footer={button}>
      <S.Wrapper>
        {icon}
        <h3>{title}</h3>
        {paragraph && <p>{paragraph}</p>}
      </S.Wrapper>
    </Layout>
  );
};
