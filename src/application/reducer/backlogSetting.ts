export type BacklogSetting = {
  apiKey: string | null;
  hostUrl: string | null;
};

export type BacklogSettingState = {
  editState: BacklogSetting;
  origin: BacklogSetting;
};

export const initialBacklogState: BacklogSetting = {
  apiKey: null,
  hostUrl: null,
};

export const initialState: BacklogSettingState = {
  editState: initialBacklogState,
  origin: initialBacklogState,
};
