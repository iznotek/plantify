import { FoodWhereInput } from "./FoodWhereInput";
import { FoodOrderByInput } from "./FoodOrderByInput";

export type FoodFindManyArgs = {
  where?: FoodWhereInput;
  orderBy?: FoodOrderByInput;
  skip?: number;
  take?: number;
};
