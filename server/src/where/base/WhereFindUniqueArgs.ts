import { ArgsType, Field } from "@nestjs/graphql";
import { WhereWhereUniqueInput } from "./WhereWhereUniqueInput";

@ArgsType()
class WhereFindUniqueArgs {
  @Field(() => WhereWhereUniqueInput, { nullable: false })
  where!: WhereWhereUniqueInput;
}

export { WhereFindUniqueArgs };
