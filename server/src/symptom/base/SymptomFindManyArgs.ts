import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SymptomWhereInput } from "./SymptomWhereInput";
import { Type } from "class-transformer";
import { SymptomOrderByInput } from "./SymptomOrderByInput";

@ArgsType()
class SymptomFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => SymptomWhereInput,
  })
  @Field(() => SymptomWhereInput, { nullable: true })
  @Type(() => SymptomWhereInput)
  where?: SymptomWhereInput;

  @ApiProperty({
    required: false,
    type: SymptomOrderByInput,
  })
  @Field(() => SymptomOrderByInput, { nullable: true })
  @Type(() => SymptomOrderByInput)
  orderBy?: SymptomOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { SymptomFindManyArgs };
