import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { FoodWhereUniqueInput } from "../../food/base/FoodWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class SymptomCreateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () => FoodWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => FoodWhereUniqueInput)
  @IsOptional()
  @Field(() => FoodWhereUniqueInput, {
    nullable: true,
  })
  food?: FoodWhereUniqueInput | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;
}
export { SymptomCreateInput };
