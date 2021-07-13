import { ArgsType, Field } from "@nestjs/graphql";
import { DirectionWhereUniqueInput } from "./DirectionWhereUniqueInput";
import { DirectionUpdateInput } from "./DirectionUpdateInput";

@ArgsType()
class UpdateDirectionArgs {
  @Field(() => DirectionWhereUniqueInput, { nullable: false })
  where!: DirectionWhereUniqueInput;
  @Field(() => DirectionUpdateInput, { nullable: false })
  data!: DirectionUpdateInput;
}

export { UpdateDirectionArgs };
