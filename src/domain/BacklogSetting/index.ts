import { Backlog } from "backlog-js";
import * as es6promise from "es6-promise";
import "isomorphic-fetch";
import "isomorphic-form-data";

es6promise.polyfill();

export type SpacePostfix = ".backlog.jp" | ".backlog.com";
export const BACKLOG_API_LOCALSTORAGE_KEY_NAME = "backlogSetting";

export type BacklogSetting = {
  spaceId: string;
  spacePostfix: SpacePostfix;
  apiKey: string;
};

export const initialState: BacklogSetting = {
  spaceId: "",
  spacePostfix: ".backlog.jp",
  apiKey: "",
};

export const createInstanceOfBacklogApi = (params: BacklogSetting) => {
  return new Backlog({
    host: params.spaceId + params.spacePostfix,
    apiKey: params.apiKey,
  });
};
