import { Element as TElement } from "../api/element/Element";

export const ELEMENT_TITLE_FIELD = "name";

export const ElementTitle = (record: TElement) => {
  return record.name;
};
