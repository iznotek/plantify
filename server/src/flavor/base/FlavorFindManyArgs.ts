import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FlavorWhereInput } from "./FlavorWhereInput";
import { Type } from "class-transformer";
import { FlavorOrderByInput } from "./FlavorOrderByInput";

@ArgsType()
class FlavorFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => FlavorWhereInput,
  })
  @Field(() => FlavorWhereInput, { nullable: true })
  @Type(() => FlavorWhereInput)
  where?: FlavorWhereInput;

  @ApiProperty({
    required: false,
    type: FlavorOrderByInput,
  })
  @Field(() => FlavorOrderByInput, { nullable: true })
  @Type(() => FlavorOrderByInput)
  orderBy?: FlavorOrderByInput;

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

export { FlavorFindManyArgs };
