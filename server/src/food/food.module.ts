import { Module } from "@nestjs/common";
import { FoodModuleBase } from "./base/food.module.base";
import { FoodService } from "./food.service";
import { FoodController } from "./food.controller";
import { FoodResolver } from "./food.resolver";

@Module({
  imports: [FoodModuleBase],
  controllers: [FoodController],
  providers: [FoodService, FoodResolver],
  exports: [FoodService],
})
export class FoodModule {}
