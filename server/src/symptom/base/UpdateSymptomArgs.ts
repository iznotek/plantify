import { ArgsType, Field } from "@nestjs/graphql";
import { SymptomWhereUniqueInput } from "./SymptomWhereUniqueInput";
import { SymptomUpdateInput } from "./SymptomUpdateInput";

@ArgsType()
class UpdateSymptomArgs {
  @Field(() => SymptomWhereUniqueInput, { nullable: false })
  where!: SymptomWhereUniqueInput;
  @Field(() => SymptomUpdateInput, { nullable: false })
  data!: SymptomUpdateInput;
}

export { UpdateSymptomArgs };
