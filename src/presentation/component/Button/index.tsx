import styled from "@emotion/styled";
import {Button as SmoothBottun} from "@smooth-ui/core-em";

export const Button = styled(SmoothBottun)`
  z-index: 0;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
