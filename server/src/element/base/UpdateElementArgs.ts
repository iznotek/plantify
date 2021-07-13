import { ArgsType, Field } from "@nestjs/graphql";
import { ElementWhereUniqueInput } from "./ElementWhereUniqueInput";
import { ElementUpdateInput } from "./ElementUpdateInput";

@ArgsType()
class UpdateElementArgs {
  @Field(() => ElementWhereUniqueInput, { nullable: false })
  where!: ElementWhereUniqueInput;
  @Field(() => ElementUpdateInput, { nullable: false })
  data!: ElementUpdateInput;
}

export { UpdateElementArgs };
