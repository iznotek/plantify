import { ArgsType, Field } from "@nestjs/graphql";
import { WhereCreateInput } from "./WhereCreateInput";

@ArgsType()
class CreateWhereArgs {
  @Field(() => WhereCreateInput, { nullable: false })
  data!: WhereCreateInput;
}

export { CreateWhereArgs };
