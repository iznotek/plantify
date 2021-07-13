import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { HeatWhereUniqueInput } from "../heat/HeatWhereUniqueInput";

export type FoodUpdateInput = {
  category?: CategoryWhereUniqueInput;
  heat?: HeatWhereUniqueInput;
};
