import React, { useCallback, useState } from "react";
import Select from "react-select";
import { useDispatch, useGlobalState } from "../../../application";
import { BacklogSetting, SpacePostfix } from "../../../domain/BacklogSetting";
import { Button } from "../../component/Button";
import { LoginFrame, LoginOuter, SelectWidth, SpaceNameInputArea } from "./element";

export type LoginPageTypes = {
  backlogSetting: BacklogSetting;
  handleAPIKeyChange: (v: string) => void;
  handleAPIKeySet: (backlogSetting: BacklogSetting) => void;
};

export const LoginPage = ({ backlogSetting, handleAPIKeySet, handleAPIKeyChange }: LoginPageTypes) => {
  const updateEvent = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => handleAPIKeyChange(ev.target.value), [handleAPIKeyChange]);
  const [spaceId, updateSpaceId] = useState<string>("");

  const [spacePostfix, updatePostfix] = useState<SpacePostfix>(".backlog.jp");
  const [apiKey, updateApiKey] = useState<string>("");
  const [isStepOneDone, changeStepOneDone] = useState<boolean>(false);
  const options = [{ label: ".backlog.jp", value: ".backlog.jp" }, { label: ".backlog.com", value: ".backlog.com" }];

  const handleUpdateApiKey = useCallback((ev: any) => updateApiKey(ev.target.value), []);
  const tryLogin = useCallback(() => {
    handleAPIKeySet({
      apiKey,
      spaceId,
      spacePostfix,
    });
  }, [spaceId, apiKey, spacePostfix]);

  return (
    <LoginOuter>
      <LoginFrame>
        <SpaceNameInputArea>
          <span>https://</span>
          <input value={spaceId} onChange={useCallback((ev: any) => updateSpaceId(ev.target.value), [])} />
          <SelectWidth>
            <Select defaultValue={options[0]} options={options} onChange={useCallback((ev: any) => updatePostfix(ev.value), [])} />
          </SelectWidth>
          <button onClick={useCallback(() => changeStepOneDone(true), [])}>next</button>
        </SpaceNameInputArea>
        {isStepOneDone ? (
          <>
            <input value={apiKey} onChange={handleUpdateApiKey} />
            <Button onClick={tryLogin}>try</Button>
          </>
        ) : null}
      </LoginFrame>
    </LoginOuter>
  );
};

export const LoginContainer = () => {
  const backlog = useGlobalState("backlogSetting");
  const dispatch = useDispatch();

  const handleAPIKeyChange = useCallback((value: string) => dispatch({ type: "UPDATE_BACKLOG_API_KEY", payload: value }), [dispatch]);
  const handleAPIKeySet = useCallback(
    (backlogSetting: BacklogSetting) => {
      dispatch({ type: "SET_BACKLOG", payload: backlogSetting });
      dispatch({ type: "FINISH_SETTING" });
    },
    [dispatch],
  );

  return <LoginPage backlogSetting={backlog} handleAPIKeyChange={handleAPIKeyChange} handleAPIKeySet={handleAPIKeySet} />;
};
