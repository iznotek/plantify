import { Category } from "../category/Category";
import { Direction } from "../direction/Direction";
import { Element } from "../element/Element";
import { Flavor } from "../flavor/Flavor";
import { Heat } from "../heat/Heat";
import { Recipe } from "../recipe/Recipe";
import { Symptom } from "../symptom/Symptom";
import { Where } from "../where/Where";

export type Food = {
  category?: Category;
  createdAt: Date;
  direction?: Array<Direction>;
  element?: Array<Element>;
  flavor?: Array<Flavor>;
  heat?: Heat;
  id: string;
  recipe?: Array<Recipe>;
  symptom?: Array<Symptom>;
  updatedAt: Date;
  where?: Array<Where>;
};
