import { Direction as TDirection } from "../api/direction/Direction";

export const DIRECTION_TITLE_FIELD = "name";

export const DirectionTitle = (record: TDirection) => {
  return record.name;
};
