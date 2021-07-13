import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { WhereWhereInput } from "./WhereWhereInput";
import { Type } from "class-transformer";
import { WhereOrderByInput } from "./WhereOrderByInput";

@ArgsType()
class WhereFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => WhereWhereInput,
  })
  @Field(() => WhereWhereInput, { nullable: true })
  @Type(() => WhereWhereInput)
  where?: WhereWhereInput;

  @ApiProperty({
    required: false,
    type: WhereOrderByInput,
  })
  @Field(() => WhereOrderByInput, { nullable: true })
  @Type(() => WhereOrderByInput)
  orderBy?: WhereOrderByInput;

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

export { WhereFindManyArgs };
