import { Module } from "@nestjs/common";
import { HeatModuleBase } from "./base/heat.module.base";
import { HeatService } from "./heat.service";
import { HeatController } from "./heat.controller";
import { HeatResolver } from "./heat.resolver";

@Module({
  imports: [HeatModuleBase],
  controllers: [HeatController],
  providers: [HeatService, HeatResolver],
  exports: [HeatService],
})
export class HeatModule {}
