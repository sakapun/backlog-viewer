export type CustomFieldOriginalResponse = {
  id: number;
  name: string;
};

export type CustomeFieldResponse = CustomFieldOriginalResponse & {
  projectId: number;
};
