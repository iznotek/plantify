import { ArgsType, Field } from "@nestjs/graphql";
import { FoodWhereUniqueInput } from "./FoodWhereUniqueInput";
import { FoodUpdateInput } from "./FoodUpdateInput";

@ArgsType()
class UpdateFoodArgs {
  @Field(() => FoodWhereUniqueInput, { nullable: false })
  where!: FoodWhereUniqueInput;
  @Field(() => FoodUpdateInput, { nullable: false })
  data!: FoodUpdateInput;
}

export { UpdateFoodArgs };
