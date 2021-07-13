import { ArgsType, Field } from "@nestjs/graphql";
import { HeatCreateInput } from "./HeatCreateInput";

@ArgsType()
class CreateHeatArgs {
  @Field(() => HeatCreateInput, { nullable: false })
  data!: HeatCreateInput;
}

export { CreateHeatArgs };
