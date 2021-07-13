import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { HeatWhereUniqueInput } from "../heat/HeatWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";

export type FoodWhereInput = {
  category?: CategoryWhereUniqueInput;
  heat?: HeatWhereUniqueInput;
  id?: StringFilter;
};
