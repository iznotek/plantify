import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryWhereUniqueInput } from "../../category/base/CategoryWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { HeatWhereUniqueInput } from "../../heat/base/HeatWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
@InputType()
class FoodWhereInput {
  @ApiProperty({
    required: false,
    type: () => CategoryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CategoryWhereUniqueInput)
  @IsOptional()
  @Field(() => CategoryWhereUniqueInput, {
    nullable: true,
  })
  category?: CategoryWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: () => HeatWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => HeatWhereUniqueInput)
  @IsOptional()
  @Field(() => HeatWhereUniqueInput, {
    nullable: true,
  })
  heat?: HeatWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;
}
export { FoodWhereInput };
