import { ArgsType, Field } from "@nestjs/graphql";
import { FoodWhereUniqueInput } from "./FoodWhereUniqueInput";

@ArgsType()
class FoodFindUniqueArgs {
  @Field(() => FoodWhereUniqueInput, { nullable: false })
  where!: FoodWhereUniqueInput;
}

export { FoodFindUniqueArgs };
