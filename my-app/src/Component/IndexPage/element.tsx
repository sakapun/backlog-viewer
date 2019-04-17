import styled from "@emotion/styled";

export const AppOuter = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const ContentOuter = styled.div`
  width: 90vw;
  min-width: 1080px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

export const ControlArea = styled.div`
  flex-grow: 0;
  margin-bottom: 30px;
`;

export const TableArea = styled.div`
  flex-grow: 1;
`;

export const FooterArea = styled.div`
  margin-top: 30px;
  flex-grow: 0;
`;
