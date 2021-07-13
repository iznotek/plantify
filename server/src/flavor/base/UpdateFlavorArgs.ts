import { ArgsType, Field } from "@nestjs/graphql";
import { FlavorWhereUniqueInput } from "./FlavorWhereUniqueInput";
import { FlavorUpdateInput } from "./FlavorUpdateInput";

@ArgsType()
class UpdateFlavorArgs {
  @Field(() => FlavorWhereUniqueInput, { nullable: false })
  where!: FlavorWhereUniqueInput;
  @Field(() => FlavorUpdateInput, { nullable: false })
  data!: FlavorUpdateInput;
}

export { UpdateFlavorArgs };
