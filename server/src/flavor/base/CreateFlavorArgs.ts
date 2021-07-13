import { ArgsType, Field } from "@nestjs/graphql";
import { FlavorCreateInput } from "./FlavorCreateInput";

@ArgsType()
class CreateFlavorArgs {
  @Field(() => FlavorCreateInput, { nullable: false })
  data!: FlavorCreateInput;
}

export { CreateFlavorArgs };
