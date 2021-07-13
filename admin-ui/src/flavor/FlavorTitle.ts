import { Flavor as TFlavor } from "../api/flavor/Flavor";

export const FLAVOR_TITLE_FIELD = "name";

export const FlavorTitle = (record: TFlavor) => {
  return record.name;
};
