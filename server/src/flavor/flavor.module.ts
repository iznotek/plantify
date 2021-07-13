import { Module } from "@nestjs/common";
import { FlavorModuleBase } from "./base/flavor.module.base";
import { FlavorService } from "./flavor.service";
import { FlavorController } from "./flavor.controller";
import { FlavorResolver } from "./flavor.resolver";

@Module({
  imports: [FlavorModuleBase],
  controllers: [FlavorController],
  providers: [FlavorService, FlavorResolver],
  exports: [FlavorService],
})
export class FlavorModule {}
