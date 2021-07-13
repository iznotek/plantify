import { Where as TWhere } from "../api/where/Where";

export const WHERE_TITLE_FIELD = "name";

export const WhereTitle = (record: TWhere) => {
  return record.name;
};
