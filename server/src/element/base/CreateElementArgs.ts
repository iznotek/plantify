import { ArgsType, Field } from "@nestjs/graphql";
import { ElementCreateInput } from "./ElementCreateInput";

@ArgsType()
class CreateElementArgs {
  @Field(() => ElementCreateInput, { nullable: false })
  data!: ElementCreateInput;
}

export { CreateElementArgs };
