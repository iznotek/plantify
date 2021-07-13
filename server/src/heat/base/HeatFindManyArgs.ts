import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { HeatWhereInput } from "./HeatWhereInput";
import { Type } from "class-transformer";
import { HeatOrderByInput } from "./HeatOrderByInput";

@ArgsType()
class HeatFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => HeatWhereInput,
  })
  @Field(() => HeatWhereInput, { nullable: true })
  @Type(() => HeatWhereInput)
  where?: HeatWhereInput;

  @ApiProperty({
    required: false,
    type: HeatOrderByInput,
  })
  @Field(() => HeatOrderByInput, { nullable: true })
  @Type(() => HeatOrderByInput)
  orderBy?: HeatOrderByInput;

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

export { HeatFindManyArgs };
