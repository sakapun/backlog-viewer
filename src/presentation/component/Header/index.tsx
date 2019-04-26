import { Box } from "@smooth-ui/core-em";
import React, { useCallback } from "react";
import { GoSync } from "react-icons/go";
import { loadIssues } from "../../../application/issues/service";
import { useDispatch, useGlobalState } from "../../../application/provider";
import { BACKLOG_API_LOCALSTORAGE_KEY_NAME } from "../../../domain/BacklogSetting";
import { Button } from "../Button";
import { AppNameBox, Outer } from "./element";

export type HeaderComponentType = {
  handleClickLogout: () => void;
  handleClickReload: () => void;
  isSettingPage: boolean;
};

export const HeaderComponent = ({ handleClickLogout, handleClickReload, isSettingPage }: HeaderComponentType) => {
  return (
    <Outer>
      <AppNameBox>優先度ビューアー</AppNameBox>
      <Box flex={1} />
      {isSettingPage ? null : (
        <>
          <Button onClick={handleClickReload} variant={"light"} height={1} borderRadius={"unset"}>
            <GoSync />
          </Button>
          <Button onClick={handleClickLogout} variant={"light"} height={1} borderRadius={"unset"}>
            ログアウト
          </Button>
        </>
      )}
    </Outer>
  );
};

export const Header = () => {
  const isSettingPage = useGlobalState("isSettingPage");

  const dispatch = useDispatch();
  const handleClickLogout = useCallback(() => {
    window.localStorage.removeItem(BACKLOG_API_LOCALSTORAGE_KEY_NAME);
    dispatch({ type: "CLEAR_BACKLOG" });
  }, []);

  return <HeaderComponent handleClickLogout={handleClickLogout} handleClickReload={loadIssues} isSettingPage={isSettingPage} />;
};
