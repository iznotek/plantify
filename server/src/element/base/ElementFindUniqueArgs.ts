import { ArgsType, Field } from "@nestjs/graphql";
import { ElementWhereUniqueInput } from "./ElementWhereUniqueInput";

@ArgsType()
class ElementFindUniqueArgs {
  @Field(() => ElementWhereUniqueInput, { nullable: false })
  where!: ElementWhereUniqueInput;
}

export { ElementFindUniqueArgs };
