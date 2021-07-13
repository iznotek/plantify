import { Food } from "../food/Food";

export type Category = {
  createdAt: Date;
  foods?: Array<Food>;
  id: string;
  name: string;
  updatedAt: Date;
};
