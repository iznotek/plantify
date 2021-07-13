import { ArgsType, Field } from "@nestjs/graphql";
import { HeatWhereUniqueInput } from "./HeatWhereUniqueInput";
import { HeatUpdateInput } from "./HeatUpdateInput";

@ArgsType()
class UpdateHeatArgs {
  @Field(() => HeatWhereUniqueInput, { nullable: false })
  where!: HeatWhereUniqueInput;
  @Field(() => HeatUpdateInput, { nullable: false })
  data!: HeatUpdateInput;
}

export { UpdateHeatArgs };
