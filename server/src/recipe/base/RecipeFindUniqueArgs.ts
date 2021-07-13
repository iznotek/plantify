import { ArgsType, Field } from "@nestjs/graphql";
import { RecipeWhereUniqueInput } from "./RecipeWhereUniqueInput";

@ArgsType()
class RecipeFindUniqueArgs {
  @Field(() => RecipeWhereUniqueInput, { nullable: false })
  where!: RecipeWhereUniqueInput;
}

export { RecipeFindUniqueArgs };
