import { Food as TFood } from "../api/food/Food";

export const FOOD_TITLE_FIELD = "id";

export const FoodTitle = (record: TFood) => {
  return record.id;
};
