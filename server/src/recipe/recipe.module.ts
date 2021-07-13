import { Module } from "@nestjs/common";
import { RecipeModuleBase } from "./base/recipe.module.base";
import { RecipeService } from "./recipe.service";
import { RecipeController } from "./recipe.controller";
import { RecipeResolver } from "./recipe.resolver";

@Module({
  imports: [RecipeModuleBase],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeResolver],
  exports: [RecipeService],
})
export class RecipeModule {}
