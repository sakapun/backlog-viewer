import React, { useCallback } from "react";
import { useDispatch, useGlobalState } from "../../../application";
import { BacklogState } from "../../../application/reducer/backlog";

export type LoginPageTypes = {
  backlog: BacklogState;
  handleAPIKeyChange: (v: string) => void;
  handleAPIKeySet: () => void;
};

export const LoginPage = ({ backlog, handleAPIKeySet, handleAPIKeyChange }: LoginPageTypes) => {
  const updateEvent = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => handleAPIKeyChange(ev.target.value), [handleAPIKeyChange]);
  return (
    <div>
      <span>{backlog.origin.apiKey}</span>
      <input value={backlog.editState.apiKey || ""} onChange={updateEvent} />
      <button onClick={handleAPIKeySet}>change</button>
    </div>
  );
};

export const LoginContainer = () => {
  const backlog = useGlobalState("backlogState");
  const dispatch = useDispatch();

  const handleAPIKeyChange = useCallback((value: string) => dispatch({ type: "UPDATE_BACKLOG_API_KEY", payload: value }), [dispatch]);
  const handleAPIKeySet = useCallback(() => dispatch({ type: "SET_BACKLOG" }), [dispatch]);

  return <LoginPage backlog={backlog} handleAPIKeyChange={handleAPIKeyChange} handleAPIKeySet={handleAPIKeySet} />;
};
