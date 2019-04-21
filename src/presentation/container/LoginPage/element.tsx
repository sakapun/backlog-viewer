import styled from "@emotion/styled";

export const LoginOuter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow-y: auto;
`;

export const LoginFrame = styled.div`
  width: 500px;
  height: 400px;
  margin: auto;
`;

export const SpaceNameInputArea = styled.div`
  display: flex;
  height: 40px;
`;

export const SpaceNameBox = styled.div`
  height: 40px;

  display: flex;
  align-items: center;

  margin-right: 16px;
  &:last-child {
    margin-right: 0px;
  }
`;
