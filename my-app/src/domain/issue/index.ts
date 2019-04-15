import {Row} from "../datagrid";
import _ from "lodash";

export type CustomField = {
  name: string,
  value: number
}
export type OriginalIssueType = {
  customFields: CustomField[];
  id: number;
  summary: string;
  issueKey: string;
  estimatedHours: null | number;
  priority: {
    id: number,
    name: string,
  }
}

export type ExtraField = {
  power: number | null;
  hoursRatio: number;
  priorityValue: number;
  priorityScore: number | null;
}
export type Issue = OriginalIssueType & ExtraField


export const buildIssueValues = (issues: OriginalIssueType[]): Issue[] => {
  const useRatio = issueHoursRatio(issues);
  return issues.map((issue) => {
    const hoursRatio = issue.estimatedHours ? issue.estimatedHours /useRatio : 0;
    const priorityValue = 5 - issue.priority.id;

    const extraFields = issue.customFields.reduce((tmp: ExtraField, customField: CustomField) => {
      if (customField.name === "効果" && customField.value > 0) {
        tmp.power = customField.value;
      }
      return tmp;
    }, {
      power: null,
      hoursRatio,
      priorityValue,
      priorityScore: 0 // powerを使って再計算するのでダミー値
    });
    const priorityScore = extraFields.power ? _.round(extraFields.power * priorityValue - hoursRatio, 1) : null;
    return {
      ...issue,
      ...extraFields,
      priorityScore,
    };
  })
};

export const issueHoursRatio = (issues: Issue[] | OriginalIssueType[]): number => {
  const max = _.maxBy(issues, "estimatedHours");
  return !!max && max.estimatedHours ? max.estimatedHours / 5 : 1;
};

export const issueSorter = (a: Issue, b: Issue): number => {
  if (a.priorityScore && b.priorityScore) {
    return b.priorityScore - a.priorityScore;
  } else if (a.priorityScore && !b.priorityScore) {
    return -1;
  }

  if (a.power === null) {
    return 1;
  }
  return a.id - b.id;
};

export const buildDataGridRows = (issues: Issue[]): Row[] => {
  return issues.map(issue => {
    return {
      id: issue.id,
      title: issue.summary,
      issueKey: issue.issueKey,
      power: issue.power,
      hoursRatio: _.round(issue.hoursRatio, 1),
      estimatedHours: issue.estimatedHours || 0,
      priorityValue: issue.priorityValue,
      priorityScore: issue.priorityScore,
    }
  });
};
