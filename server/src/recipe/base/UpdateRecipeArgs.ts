import { ArgsType, Field } from "@nestjs/graphql";
import { RecipeWhereUniqueInput } from "./RecipeWhereUniqueInput";
import { RecipeUpdateInput } from "./RecipeUpdateInput";

@ArgsType()
class UpdateRecipeArgs {
  @Field(() => RecipeWhereUniqueInput, { nullable: false })
  where!: RecipeWhereUniqueInput;
  @Field(() => RecipeUpdateInput, { nullable: false })
  data!: RecipeUpdateInput;
}

export { UpdateRecipeArgs };
