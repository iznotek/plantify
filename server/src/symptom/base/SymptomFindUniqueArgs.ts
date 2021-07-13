import { ArgsType, Field } from "@nestjs/graphql";
import { SymptomWhereUniqueInput } from "./SymptomWhereUniqueInput";

@ArgsType()
class SymptomFindUniqueArgs {
  @Field(() => SymptomWhereUniqueInput, { nullable: false })
  where!: SymptomWhereUniqueInput;
}

export { SymptomFindUniqueArgs };
