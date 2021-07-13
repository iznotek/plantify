import { ArgsType, Field } from "@nestjs/graphql";
import { DirectionWhereUniqueInput } from "./DirectionWhereUniqueInput";

@ArgsType()
class DeleteDirectionArgs {
  @Field(() => DirectionWhereUniqueInput, { nullable: false })
  where!: DirectionWhereUniqueInput;
}

export { DeleteDirectionArgs };
