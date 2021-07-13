import { RecipeWhereInput } from "./RecipeWhereInput";
import { RecipeOrderByInput } from "./RecipeOrderByInput";

export type RecipeFindManyArgs = {
  where?: RecipeWhereInput;
  orderBy?: RecipeOrderByInput;
  skip?: number;
  take?: number;
};
