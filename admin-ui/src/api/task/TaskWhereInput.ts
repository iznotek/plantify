import { StringFilter } from "../../util/StringFilter";
import { ProjectWhereUniqueInput } from "../project/ProjectWhereUniqueInput";

export type TaskWhereInput = {
  id?: StringFilter;
  project?: ProjectWhereUniqueInput;
  title?: StringFilter;
};
