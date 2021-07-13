import { ArgsType, Field } from "@nestjs/graphql";
import { RecipeWhereUniqueInput } from "./RecipeWhereUniqueInput";

@ArgsType()
class DeleteRecipeArgs {
  @Field(() => RecipeWhereUniqueInput, { nullable: false })
  where!: RecipeWhereUniqueInput;
}

export { DeleteRecipeArgs };
