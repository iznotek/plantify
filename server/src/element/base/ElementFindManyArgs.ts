import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ElementWhereInput } from "./ElementWhereInput";
import { Type } from "class-transformer";
import { ElementOrderByInput } from "./ElementOrderByInput";

@ArgsType()
class ElementFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ElementWhereInput,
  })
  @Field(() => ElementWhereInput, { nullable: true })
  @Type(() => ElementWhereInput)
  where?: ElementWhereInput;

  @ApiProperty({
    required: false,
    type: ElementOrderByInput,
  })
  @Field(() => ElementOrderByInput, { nullable: true })
  @Type(() => ElementOrderByInput)
  orderBy?: ElementOrderByInput;

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

export { ElementFindManyArgs };
