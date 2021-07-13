import { ArgsType, Field } from "@nestjs/graphql";
import { RecipeCreateInput } from "./RecipeCreateInput";

@ArgsType()
class CreateRecipeArgs {
  @Field(() => RecipeCreateInput, { nullable: false })
  data!: RecipeCreateInput;
}

export { CreateRecipeArgs };
