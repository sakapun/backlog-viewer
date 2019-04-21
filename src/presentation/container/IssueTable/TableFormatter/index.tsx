import styled from "@emotion/styled";
import React from "react";

export const Outer = styled.div`
  text-align: center;
`;

export const numberFormatter = ({ value }: { value: number | null }) => {
  return value === null ? null : <Outer>{value}</Outer>;
};

export const issueKeyFormatCreator = (hostDomain: string) => ({ value }: { value: string }) => {
  return (
    <a href={`https://${hostDomain}/view/` + value} target={"_blank"}>
      {value}
    </a>
  );
};
