import React, { useCallback } from "react";
import { useDispatch, useGlobalState } from "../../application/";

export const LoginPage = () => {
  const ok = useGlobalState("ok");
  const dispatch = useDispatch();

  const event = useCallback(() => dispatch({ type: "no" }), [dispatch]);
  return (
    <div>
      <span>{ok.toString()}</span>
      <button onClick={event}>change</button>
    </div>
  );
};
