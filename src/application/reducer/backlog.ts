export type BacklogSetting = {
  apiKey: string | null;
  hostUrl: string | null;
};

export type BacklogState = {
  editState: BacklogSetting;
  origin: BacklogSetting;
};

export const initialBacklogState: BacklogSetting = {
  apiKey: null,
  hostUrl: null,
};

export const initialState: BacklogState = {
  editState: initialBacklogState,
  origin: initialBacklogState,
};
