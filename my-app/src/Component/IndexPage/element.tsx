import styled from "@emotion/styled";

const CONTROL_AREA_HEIGHT = "80px";

export const AppOuter = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const ContentOuter = styled.div`
  width: 90vw;
  height: 100%;
  min-width: 1080px;
  margin: auto;
`;

export const ControlArea = styled.div`
  height: ${CONTROL_AREA_HEIGHT};
`;

export const TableArea = styled.div`
  height: calc(100% - ${CONTROL_AREA_HEIGHT} - 50px);
  margin-bottom: 15px;
`;
