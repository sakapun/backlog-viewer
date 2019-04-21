import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useGlobalState } from "../../../application";
import {
  BACKLOG_API_LOCALSTORAGE_KEY_NAME,
  BacklogSetting,
  createInstanceOfBacklogApi,
  SpacePostfix,
} from "../../../domain/BacklogSetting";
import { Button } from "../../component/Button";
import { LoginFrame, LoginOuter, SelectWidth, SpaceNameInputArea } from "./element";

export type LoginPageTypes = {
  backlogSetting: BacklogSetting;
  handleAPIKeySet: (backlogSetting: BacklogSetting) => void;
};

export const LoginPage = ({ handleAPIKeySet }: LoginPageTypes) => {
  const [spaceId, updateSpaceId] = useState<string>("");
  const [spacePostfix, updatePostfix] = useState<SpacePostfix>(".backlog.jp");
  const [apiKey, updateApiKey] = useState<string>("");
  const backlogSetting: BacklogSetting = {
    spaceId,
    spacePostfix,
    apiKey,
  };

  const [isStepOneDone, changeStepOneDone] = useState<boolean>(false);
  const [errorStr, setErrorStr] = useState<string>("");
  const options = [{ label: ".backlog.jp", value: ".backlog.jp" }, { label: ".backlog.com", value: ".backlog.com" }];

  /**
   * DOMイベント
   */
  const handleUpdateApiKey = useCallback((ev: any) => updateApiKey(ev.target.value), []);

  /**
   * ログインを施行し、成功だったら値を保存して課題画面へ
   */
  const tryLogin = useCallback(() => {
    const backlogApi = createInstanceOfBacklogApi(backlogSetting);
    (async () => {
      try {
        // とりあえず叩けるか施行
        await backlogApi.getSpace();

        handleAPIKeySet(backlogSetting);
        window.localStorage.setItem(BACKLOG_API_LOCALSTORAGE_KEY_NAME, JSON.stringify(backlogSetting));
        setErrorStr("");
      } catch {
        setErrorStr("認証エラーになりました");
      }
    })();
  }, [spaceId, apiKey, spacePostfix]);

  /**
   * 初回はローカルストレージから値を復元
   */
  useEffect(() => {
    const localstorageData: BacklogSetting | null = JSON.parse(localStorage.getItem(BACKLOG_API_LOCALSTORAGE_KEY_NAME) || "null");
    if (localstorageData !== null) {
      handleAPIKeySet(localstorageData);
    }
  }, []);

  return (
    <LoginOuter>
      <LoginFrame>
        <SpaceNameInputArea>
          <span>https://</span>
          <input name={"spaceId"} type={"text"} value={spaceId} onChange={useCallback((ev: any) => updateSpaceId(ev.target.value), [])} />
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
        {errorStr !== "" && <div>{errorStr}</div>}
      </LoginFrame>
    </LoginOuter>
  );
};

export const LoginContainer = () => {
  const backlog = useGlobalState("backlogSetting");
  const dispatch = useDispatch();

  const handleAPIKeySet = useCallback(
    (backlogSetting: BacklogSetting) => {
      dispatch({ type: "SET_BACKLOG", payload: backlogSetting });
      dispatch({ type: "FINISH_SETTING" });
    },
    [dispatch],
  );

  return <LoginPage backlogSetting={backlog} handleAPIKeySet={handleAPIKeySet} />;
};
