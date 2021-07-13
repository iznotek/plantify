import { ArgsType, Field } from "@nestjs/graphql";
import { SymptomWhereUniqueInput } from "./SymptomWhereUniqueInput";

@ArgsType()
class DeleteSymptomArgs {
  @Field(() => SymptomWhereUniqueInput, { nullable: false })
  where!: SymptomWhereUniqueInput;
}

export { DeleteSymptomArgs };
