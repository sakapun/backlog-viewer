import {ReactSelectProps} from "../../Component/IndexPage/type";

export type Project = {
  id: number,
  name: string,
}

export const buildSelectProps = (projects: Project[]): ReactSelectProps[] => {
  return projects.map( project => {
    return {
      value: project.id,
      label: project.name,
    };
  })
};
