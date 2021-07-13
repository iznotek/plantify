import { ArgsType, Field } from "@nestjs/graphql";
import { SymptomCreateInput } from "./SymptomCreateInput";

@ArgsType()
class CreateSymptomArgs {
  @Field(() => SymptomCreateInput, { nullable: false })
  data!: SymptomCreateInput;
}

export { CreateSymptomArgs };
