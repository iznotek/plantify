import { ArgsType, Field } from "@nestjs/graphql";
import { FoodCreateInput } from "./FoodCreateInput";

@ArgsType()
class CreateFoodArgs {
  @Field(() => FoodCreateInput, { nullable: false })
  data!: FoodCreateInput;
}

export { CreateFoodArgs };
