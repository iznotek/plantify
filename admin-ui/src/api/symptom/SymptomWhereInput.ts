import { StringNullableFilter } from "../../util/StringNullableFilter";
import { FoodWhereUniqueInput } from "../food/FoodWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";

export type SymptomWhereInput = {
  description?: StringNullableFilter;
  food?: FoodWhereUniqueInput;
  id?: StringFilter;
  name?: StringFilter;
};
