import { Module } from "@nestjs/common";
import { DirectionModuleBase } from "./base/direction.module.base";
import { DirectionService } from "./direction.service";
import { DirectionController } from "./direction.controller";
import { DirectionResolver } from "./direction.resolver";

@Module({
  imports: [DirectionModuleBase],
  controllers: [DirectionController],
  providers: [DirectionService, DirectionResolver],
  exports: [DirectionService],
})
export class DirectionModule {}
