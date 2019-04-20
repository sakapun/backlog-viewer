export const defaultState = {
  ok: true,
};

export type State = typeof defaultState;

export type Action = { type: "no" } | { type: "yes" };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "no":
      return {
        ok: false,
      };
    case "yes":
      return {
        ok: true,
      };
    default:
      return state;
  }
};
