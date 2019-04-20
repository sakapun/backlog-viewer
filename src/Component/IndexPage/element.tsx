import styled from "@emotion/styled";

export const HEADER_HEIGHT = "40px";
export const AppOuter = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  * {
    box-sizing: border-box;
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

export const SidebarOuter = styled.div`
  width: 300px;
  min-width: 300px;
  overflow: hidden;
`;

export const SidebarContent = styled.div`
  padding: 15px;
  height: 100%;
`;

export const ContentOuter = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 30px 15px;
`;

export const ControlArea = styled.div`
  margin-bottom: 50px;
`;
