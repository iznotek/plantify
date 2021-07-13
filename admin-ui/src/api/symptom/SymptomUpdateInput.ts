import { FoodWhereUniqueInput } from "../food/FoodWhereUniqueInput";

export type SymptomUpdateInput = {
  description?: string | null;
  food?: FoodWhereUniqueInput | null;
  name?: string;
};
