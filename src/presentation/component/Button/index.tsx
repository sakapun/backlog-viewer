import styled from "@emotion/styled";
import { Button as SmoothButton } from "@smooth-ui/core-em";

export const Button = styled(SmoothButton)`
  z-index: 0;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
