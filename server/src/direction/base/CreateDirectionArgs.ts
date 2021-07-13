import { ArgsType, Field } from "@nestjs/graphql";
import { DirectionCreateInput } from "./DirectionCreateInput";

@ArgsType()
class CreateDirectionArgs {
  @Field(() => DirectionCreateInput, { nullable: false })
  data!: DirectionCreateInput;
}

export { CreateDirectionArgs };
