import { ArgsType, Field } from "@nestjs/graphql";
import { WhereWhereUniqueInput } from "./WhereWhereUniqueInput";

@ArgsType()
class DeleteWhereArgs {
  @Field(() => WhereWhereUniqueInput, { nullable: false })
  where!: WhereWhereUniqueInput;
}

export { DeleteWhereArgs };
