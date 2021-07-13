import { FoodWhereUniqueInput } from "./FoodWhereUniqueInput";
import { FoodUpdateInput } from "./FoodUpdateInput";

export type UpdateFoodArgs = {
  where: FoodWhereUniqueInput;
  data: FoodUpdateInput;
};
