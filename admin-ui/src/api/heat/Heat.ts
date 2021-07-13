import { Food } from "../food/Food";

export type Heat = {
  color: string | null;
  createdAt: Date;
  foods?: Array<Food>;
  id: string;
  name: string;
  updatedAt: Date;
};
