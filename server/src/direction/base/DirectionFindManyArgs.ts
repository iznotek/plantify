import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DirectionWhereInput } from "./DirectionWhereInput";
import { Type } from "class-transformer";
import { DirectionOrderByInput } from "./DirectionOrderByInput";

@ArgsType()
class DirectionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => DirectionWhereInput,
  })
  @Field(() => DirectionWhereInput, { nullable: true })
  @Type(() => DirectionWhereInput)
  where?: DirectionWhereInput;

  @ApiProperty({
    required: false,
    type: DirectionOrderByInput,
  })
  @Field(() => DirectionOrderByInput, { nullable: true })
  @Type(() => DirectionOrderByInput)
  orderBy?: DirectionOrderByInput;

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

export { DirectionFindManyArgs };
