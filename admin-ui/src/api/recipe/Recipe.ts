import { Food } from "../food/Food";

export type Recipe = {
  createdAt: Date;
  description: string;
  foods?: Array<Food>;
  id: string;
  updatedAt: Date;
};
