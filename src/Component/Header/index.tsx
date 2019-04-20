import React from "react";
import { AppNameBox, Outer } from "./element";

export const Header = ({ toggleMain }: { toggleMain: () => void }) => {
  return (
    <Outer>
      <AppNameBox>優先度ビューアー</AppNameBox>
      <button onClick={toggleMain}>toggle</button>
    </Outer>
  );
};
