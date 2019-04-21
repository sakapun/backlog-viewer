import styled from "@emotion/styled";

export const HEADER_HEIGHT = "40px";
export const AppOuter = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  * {
    font-family: "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif;
  }
`;

export const HeaderOuter = styled.div`
  height: ${HEADER_HEIGHT};
  max-height: ${HEADER_HEIGHT};
  overflow: hidden;
`;

export const MainOuter = styled.div`
  display: flex;
  overflow: hidden;
  flex-grow: 1;
`;
