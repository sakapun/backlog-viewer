import styled from "@emotion/styled";
import { DIMENS } from "./dimens";

type PropType = {
  isInline?: boolean;
};

const Spacer = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
`;
export const SpacerRight = styled(Spacer)`
  display: inline-flex;
  width: auto;

  margin-right: ${DIMENS.X1};

  &.X0_5 {
    margin-right: ${DIMENS.X0_5};
  }
`;

export const SpacerBottom = styled(Spacer)`
  margin-bottom: ${DIMENS.X1};
`;
