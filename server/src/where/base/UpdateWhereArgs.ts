import { ArgsType, Field } from "@nestjs/graphql";
import { WhereWhereUniqueInput } from "./WhereWhereUniqueInput";
import { WhereUpdateInput } from "./WhereUpdateInput";

@ArgsType()
class UpdateWhereArgs {
  @Field(() => WhereWhereUniqueInput, { nullable: false })
  where!: WhereWhereUniqueInput;
  @Field(() => WhereUpdateInput, { nullable: false })
  data!: WhereUpdateInput;
}

export { UpdateWhereArgs };
