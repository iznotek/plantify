import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryWhereUniqueInput } from "../../category/base/CategoryWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { HeatWhereUniqueInput } from "../../heat/base/HeatWhereUniqueInput";
@InputType()
class FoodCreateInput {
  @ApiProperty({
    required: true,
    type: () => CategoryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CategoryWhereUniqueInput)
  @Field(() => CategoryWhereUniqueInput)
  category!: CategoryWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => HeatWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => HeatWhereUniqueInput)
  @Field(() => HeatWhereUniqueInput)
  heat!: HeatWhereUniqueInput;
}
export { FoodCreateInput };
