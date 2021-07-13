import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FoodWhereInput } from "./FoodWhereInput";
import { Type } from "class-transformer";
import { FoodOrderByInput } from "./FoodOrderByInput";

@ArgsType()
class FoodFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => FoodWhereInput,
  })
  @Field(() => FoodWhereInput, { nullable: true })
  @Type(() => FoodWhereInput)
  where?: FoodWhereInput;

  @ApiProperty({
    required: false,
    type: FoodOrderByInput,
  })
  @Field(() => FoodOrderByInput, { nullable: true })
  @Type(() => FoodOrderByInput)
  orderBy?: FoodOrderByInput;

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

export { FoodFindManyArgs };
