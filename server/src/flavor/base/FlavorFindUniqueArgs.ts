import { ArgsType, Field } from "@nestjs/graphql";
import { FlavorWhereUniqueInput } from "./FlavorWhereUniqueInput";

@ArgsType()
class FlavorFindUniqueArgs {
  @Field(() => FlavorWhereUniqueInput, { nullable: false })
  where!: FlavorWhereUniqueInput;
}

export { FlavorFindUniqueArgs };
