import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { HeatWhereUniqueInput } from "../heat/HeatWhereUniqueInput";

export type FoodCreateInput = {
  category: CategoryWhereUniqueInput;
  heat: HeatWhereUniqueInput;
};
