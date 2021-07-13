import { Food } from "../food/Food";

export type Symptom = {
  createdAt: Date;
  description: string | null;
  food?: Food | null;
  id: string;
  name: string;
  updatedAt: Date;
};
