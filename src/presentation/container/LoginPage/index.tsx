import React, { useCallback } from "react";
import { useDispatch, useGlobalState } from "../../../application";
import { BacklogSettingState } from "../../../application/reducer/backlogSetting";

export type LoginPageTypes = {
  backlogSetting: BacklogSettingState;
  handleAPIKeyChange: (v: string) => void;
  handleAPIKeySet: () => void;
};

export const LoginPage = ({ backlogSetting, handleAPIKeySet, handleAPIKeyChange }: LoginPageTypes) => {
  const updateEvent = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => handleAPIKeyChange(ev.target.value), [handleAPIKeyChange]);
  return (
    <div>
      <span>{backlogSetting.origin.apiKey}</span>
      <input value={backlogSetting.editState.apiKey || ""} onChange={updateEvent} />
      <button onClick={handleAPIKeySet}>change</button>
    </div>
  );
};

export const LoginContainer = () => {
  const backlog = useGlobalState("backlogSetting");
  const dispatch = useDispatch();

  const handleAPIKeyChange = useCallback((value: string) => dispatch({ type: "UPDATE_BACKLOG_API_KEY", payload: value }), [dispatch]);
  const handleAPIKeySet = useCallback(() => dispatch({ type: "SET_BACKLOG" }), [dispatch]);

  return <LoginPage backlogSetting={backlog} handleAPIKeyChange={handleAPIKeyChange} handleAPIKeySet={handleAPIKeySet} />;
};
