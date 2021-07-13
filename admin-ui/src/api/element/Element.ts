import { Food } from "../food/Food";

export type Element = {
  createdAt: Date;
  foods?: Array<Food>;
  id: string;
  name: string;
  updatedAt: Date;
};
