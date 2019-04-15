import React from "react";

export type Row = {
  id: number,
  issueKey: React.ReactNode,
  title: string,
  power: null | number;
  estimatedHours: number;
  priorityValue: number;
}
