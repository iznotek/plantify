import { Food } from "../food/Food";

export type Flavor = {
  createdAt: Date;
  foods?: Array<Food>;
  id: string;
  name: string | null;
  updatedAt: Date;
};
