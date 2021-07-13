import { Heat as THeat } from "../api/heat/Heat";

export const HEAT_TITLE_FIELD = "name";

export const HeatTitle = (record: THeat) => {
  return record.name;
};
