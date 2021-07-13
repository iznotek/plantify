import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../../category/base/Category";
import { ValidateNested, IsDate, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Direction } from "../../direction/base/Direction";
import { Element } from "../../element/base/Element";
import { Flavor } from "../../flavor/base/Flavor";
import { Heat } from "../../heat/base/Heat";
import { Recipe } from "../../recipe/base/Recipe";
import { Symptom } from "../../symptom/base/Symptom";
import { Where } from "../../where/base/Where";
@ObjectType()
class Food {
  @ApiProperty({
    required: true,
    type: () => Category,
  })
  @ValidateNested()
  @Type(() => Category)
  category?: Category;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: () => [Direction],
  })
  @ValidateNested()
  @Type(() => Direction)
  @IsOptional()
  direction?: Array<Direction>;

  @ApiProperty({
    required: true,
    type: () => [Element],
  })
  @ValidateNested()
  @Type(() => Element)
  @IsOptional()
  element?: Array<Element>;

  @ApiProperty({
    required: true,
    type: () => [Flavor],
  })
  @ValidateNested()
  @Type(() => Flavor)
  @IsOptional()
  flavor?: Array<Flavor>;

  @ApiProperty({
    required: true,
    type: () => Heat,
  })
  @ValidateNested()
  @Type(() => Heat)
  heat?: Heat;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
    type: () => [Recipe],
  })
  @ValidateNested()
  @Type(() => Recipe)
  @IsOptional()
  recipe?: Array<Recipe>;

  @ApiProperty({
    required: true,
    type: () => [Symptom],
  })
  @ValidateNested()
  @Type(() => Symptom)
  @IsOptional()
  symptom?: Array<Symptom>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    required: true,
    type: () => [Where],
  })
  @ValidateNested()
  @Type(() => Where)
  @IsOptional()
  where?: Array<Where>;
}
export { Food };
