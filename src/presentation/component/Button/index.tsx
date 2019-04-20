import styled from "@emotion/styled";
import { COLOR, DIMENS, FONTSIZE } from "../../../style";

export type PropType = {
  className?: string;
  onClick?: (event: any) => void;
  isBold?: boolean;
};

export const Button = styled.button`
  background-color: ${COLOR.MATERIAL.GRAY[100]};
  border: 1px solid ${COLOR.MATERIAL.GRAY[300]};
  border-radius: 4px;
  ${FONTSIZE.S};
  line-height: 1;
  min-height: 32px;
  padding: ${DIMENS.X0_5} ${DIMENS.X1_5};
  font-weight: ${(props: PropType) => (props.isBold ? 900 : "inherit")};
  // ホバーの場合
  :hover {
    background-color: ${COLOR.MATERIAL.GRAY[300]};
    border-color: ${COLOR.MATERIAL.GRAY[400]};
    cursor: pointer;
    transition: all 0.2s ease;
  }
  // フォーカスの場合
  :focus {
    outline: none;
    background-color: ${COLOR.MATERIAL.GRAY[300]};
    border-color: ${COLOR.MATERIAL.GRAY[400]};
    transition: all 0.2s ease;
  }
  // 無効の場合
  :disabled {
    cursor: not-allowed;
  }
  /* 赤いボタン */
  &.red {
    background-color: ${COLOR.MATERIAL.RED[600]};
    border-color: ${COLOR.MATERIAL.RED[600]};
    color: ${COLOR.MATERIAL.WHITE};
    &:hover,
    &:focus {
      background-color: ${COLOR.MATERIAL.RED[800]};
      border-color: ${COLOR.MATERIAL.RED[800]};
    }
    &:disabled {
      background-color: ${COLOR.MATERIAL.RED[300]};
      border-color: ${COLOR.MATERIAL.RED[300]};
    }
  }
  /* 白いボタン */
  &.white {
    background-color: ${COLOR.MATERIAL.WHITE};
    border-color: ${COLOR.MATERIAL.GRAY[300]};
    color: ${COLOR.MATERIAL.BLACK};
    &:hover,
    &:focus {
      background-color: ${COLOR.MATERIAL.GRAY[100]};
    }
  }
  /* 透明のボタン */
  &.transparent {
    background-color: transparent;
    border-color: transparent;
    color: #ffffff;
    &:hover,
    &:focus {
      background-color: rgba(255, 255, 255, 0.16);
      border-color: transparent;
    }
  }
  /* 黒いボタン */
  &.gray {
    background-color: ${COLOR.MATERIAL.GRAY[800]};
    color: ${COLOR.MATERIAL.WHITE};
    &:hover,
    &:focus {
      background-color: ${COLOR.MATERIAL.GRAY[900]};
    }
  }
`;
