import { FoodWhereUniqueInput } from "../food/FoodWhereUniqueInput";

export type SymptomCreateInput = {
  description?: string | null;
  food?: FoodWhereUniqueInput | null;
  name: string;
};
