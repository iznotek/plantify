import { ArgsType, Field } from "@nestjs/graphql";
import { HeatWhereUniqueInput } from "./HeatWhereUniqueInput";

@ArgsType()
class HeatFindUniqueArgs {
  @Field(() => HeatWhereUniqueInput, { nullable: false })
  where!: HeatWhereUniqueInput;
}

export { HeatFindUniqueArgs };
