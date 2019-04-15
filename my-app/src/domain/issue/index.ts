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
}

export type ExtraField = {
  power: number | null
}
export type Issue = OriginalIssueType & ExtraField


export const buildIssueValues = (issues: OriginalIssueType[]): Issue[] => {
  return issues.map((issue) => {
    const extraFields = issue.customFields.reduce((tmp: ExtraField, customField: CustomField) => {
      if (customField.name === "効果" && customField.value > 0) {
        tmp.power = customField.value;
      }
      return tmp;
    }, {
      power: null
    });
    return {
      ...issue,
      ...extraFields,
    };
  })
};

export const issueHoursRatio = (issues: Issue[]): number => {
  const max = _.maxBy(issues, "estimatedHours");
  const ratio = !!max && max.estimatedHours ? max.estimatedHours / 5 : 1;
  return ratio;
};

export const issueSorter = (a: Issue, b: Issue): number => {
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
      hoursRatio: issue.estimatedHours ? _.round(issue.estimatedHours / issueHoursRatio(issues), 1) : 0
    }
  });
};
