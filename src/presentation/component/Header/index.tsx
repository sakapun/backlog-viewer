import React, { useCallback } from "react";
import { useDispatch } from "../../../application/provider";
import { BACKLOG_API_LOCALSTORAGE_KEY_NAME } from "../../../domain/BacklogSetting";
import { Button } from "../Button";
import { AppNameBox, Outer } from "./element";

export type HeaderComponentType = {
  handleClickLogout: () => void;
};

export const HeaderComponent = ({ handleClickLogout }: HeaderComponentType) => {
  return (
    <Outer>
      <AppNameBox>優先度ビューアー</AppNameBox>
      <Button onClick={handleClickLogout}>logout</Button>
    </Outer>
  );
};

export const Header = () => {
  const dispatch = useDispatch();
  const handleClickLogout = useCallback(() => {
    window.localStorage.removeItem(BACKLOG_API_LOCALSTORAGE_KEY_NAME);
    dispatch({ type: "CLEAR_BACKLOG" });
  }, []);

  return <HeaderComponent handleClickLogout={handleClickLogout} />;
};
