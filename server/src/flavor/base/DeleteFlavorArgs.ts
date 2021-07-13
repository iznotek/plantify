import { ArgsType, Field } from "@nestjs/graphql";
import { FlavorWhereUniqueInput } from "./FlavorWhereUniqueInput";

@ArgsType()
class DeleteFlavorArgs {
  @Field(() => FlavorWhereUniqueInput, { nullable: false })
  where!: FlavorWhereUniqueInput;
}

export { DeleteFlavorArgs };
