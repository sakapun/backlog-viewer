import styled from "@emotion/styled";
import React from "react";

export const Outer = styled.div`
  text-align: center;
`;

export const NumberFormatter = ({value} : {value: number | null}) => {
  return value === null ? null : <Outer>{value}</Outer> ;
}
