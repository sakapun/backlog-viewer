import React from "react";
import { Header } from "../Header";
import { MainPageContainer } from "../IssuePage";
import { AppOuter, HeaderOuter, MainOuter } from "./element";

export const IndexPage = () => {
  return (
    <AppOuter>
      <HeaderOuter>
        <Header />
      </HeaderOuter>
      <MainOuter>
        <MainPageContainer />
      </MainOuter>
    </AppOuter>
  );
};
