import { ArgsType, Field } from "@nestjs/graphql";
import { HeatWhereUniqueInput } from "./HeatWhereUniqueInput";

@ArgsType()
class DeleteHeatArgs {
  @Field(() => HeatWhereUniqueInput, { nullable: false })
  where!: HeatWhereUniqueInput;
}

export { DeleteHeatArgs };
