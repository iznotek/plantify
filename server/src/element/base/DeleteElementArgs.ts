import { ArgsType, Field } from "@nestjs/graphql";
import { ElementWhereUniqueInput } from "./ElementWhereUniqueInput";

@ArgsType()
class DeleteElementArgs {
  @Field(() => ElementWhereUniqueInput, { nullable: false })
  where!: ElementWhereUniqueInput;
}

export { DeleteElementArgs };
