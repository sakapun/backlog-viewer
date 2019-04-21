import { Alert, Box, Input } from "@smooth-ui/core-em";
import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useGlobalState } from "../../../application/provider";
import {
  BACKLOG_API_LOCALSTORAGE_KEY_NAME,
  BacklogSetting,
  createInstanceOfBacklogApi,
  SpacePostfix,
} from "../../../domain/BacklogSetting";
import { Button } from "../../component/Button";
import { LoginFrame, LoginOuter, SpaceNameBox, SpaceNameInputArea } from "./element";

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
  const handleClickNext = useCallback(() => changeStepOneDone(true), []);

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
        setErrorStr("認証エラーです");
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
        <Box mb={4}>
          <div>
            <span>Backlog スペースID</span>
          </div>
          <SpaceNameInputArea>
            <SpaceNameBox>
              <span>https://</span>
            </SpaceNameBox>
            <SpaceNameBox>
              <Input name={"spaceId"} value={spaceId} onChange={useCallback((ev: any) => updateSpaceId(ev.target.value), [])} />
            </SpaceNameBox>
            <SpaceNameBox style={{ flexGrow: 1 }}>
              <div style={{ width: "100%" }}>
                <Select defaultValue={options[0]} options={options} onChange={useCallback((ev: any) => updatePostfix(ev.value), [])} />
              </div>
            </SpaceNameBox>
          </SpaceNameInputArea>
          {isStepOneDone || (
            <Button onClick={handleClickNext} disabled={spaceId === ""} width={1} mt={2}>
              next
            </Button>
          )}
        </Box>
        {isStepOneDone ? (
          <Box mb={6} width={1}>
            <div>API Key</div>
            <Input value={apiKey} onChange={handleUpdateApiKey} display={"block"} width={1} mb={2} />
            <Button onClick={tryLogin} disabled={apiKey === "" || spaceId === ""} width={1}>
              try
            </Button>
          </Box>
        ) : null}
        {errorStr !== "" && <Alert variant="danger">{errorStr}</Alert>}
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
