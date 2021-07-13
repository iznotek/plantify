import { ArgsType, Field } from "@nestjs/graphql";
import { DirectionWhereUniqueInput } from "./DirectionWhereUniqueInput";

@ArgsType()
class DirectionFindUniqueArgs {
  @Field(() => DirectionWhereUniqueInput, { nullable: false })
  where!: DirectionWhereUniqueInput;
}

export { DirectionFindUniqueArgs };
