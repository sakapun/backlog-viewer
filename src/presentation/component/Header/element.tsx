import styled from "@emotion/styled";
import { HEADER_HEIGHT } from "../../container/IndexPage/element";

export const Outer = styled.div`
  height: 100%;
  background: #f9f9f9;
  display: flex;
  align-items: center;
`;

export const AppNameBox = styled.div`
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  line-height: ${HEADER_HEIGHT};
`;
