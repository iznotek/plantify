import { ArgsType, Field } from "@nestjs/graphql";
import { FoodWhereUniqueInput } from "./FoodWhereUniqueInput";

@ArgsType()
class DeleteFoodArgs {
  @Field(() => FoodWhereUniqueInput, { nullable: false })
  where!: FoodWhereUniqueInput;
}

export { DeleteFoodArgs };
