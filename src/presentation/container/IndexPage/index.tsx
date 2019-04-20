import React from "react";
import { useGlobalState } from "../../../application/provider";
import { Header } from "../../component/Header";
import { MainPageContainer } from "../IssuePage";
import { LoginContainer } from "../LoginPage";
import { AppOuter, HeaderOuter, MainOuter } from "./element";

export type IndexComponentType = {
  isSettingPage: boolean;
};
export const IndexPageComponent = ({ isSettingPage }: IndexComponentType) => {
  return (
    <AppOuter>
      <HeaderOuter>
        <Header />
      </HeaderOuter>
      <MainOuter>{isSettingPage ? <LoginContainer /> : <MainPageContainer /> }</MainOuter>
    </AppOuter>
  );
};

export const IndexPage = () => {
  const isSettingPage = useGlobalState("isSettingPage");
  return <IndexPageComponent isSettingPage={isSettingPage} />;
};
