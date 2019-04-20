import React from "react";
import { useGlobalState } from "../../../application/provider";
import { Header } from "../../component/Header";
import { MainPageContainer } from "../IssuePage";
import { LoginContainer } from "../LoginPage";
import { AppOuter, HeaderOuter, MainOuter } from "./element";

export type IndexComponentType = {
  isApiEnable: boolean;
};
export const IndexPageComponent = ({ isApiEnable }: IndexComponentType) => {
  return (
    <AppOuter>
      <HeaderOuter>
        <Header />
      </HeaderOuter>
      <MainOuter>{isApiEnable ? <MainPageContainer /> : <LoginContainer />}</MainOuter>
    </AppOuter>
  );
};

export const IndexPage = () => {
  const backlogSetting = useGlobalState("backlogSetting");
  return <IndexPageComponent isApiEnable={!!backlogSetting.origin.apiKey} />;
};
