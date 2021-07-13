import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type FlavorWhereInput = {
  id?: StringFilter;
  name?: StringNullableFilter;
};
