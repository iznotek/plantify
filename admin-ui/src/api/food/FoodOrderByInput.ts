import { SortOrder } from "../../util/SortOrder";

export type FoodOrderByInput = {
  categoryId?: SortOrder;
  createdAt?: SortOrder;
  heatId?: SortOrder;
  id?: SortOrder;
  updatedAt?: SortOrder;
};
