import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RecipeWhereInput } from "./RecipeWhereInput";
import { Type } from "class-transformer";
import { RecipeOrderByInput } from "./RecipeOrderByInput";

@ArgsType()
class RecipeFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => RecipeWhereInput,
  })
  @Field(() => RecipeWhereInput, { nullable: true })
  @Type(() => RecipeWhereInput)
  where?: RecipeWhereInput;

  @ApiProperty({
    required: false,
    type: RecipeOrderByInput,
  })
  @Field(() => RecipeOrderByInput, { nullable: true })
  @Type(() => RecipeOrderByInput)
  orderBy?: RecipeOrderByInput;

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

export { RecipeFindManyArgs };
