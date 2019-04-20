export type SpacePostfix = ".backlog.jp" | ".backlog.com";

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
