import { Module } from "@nestjs/common";
import { ElementModuleBase } from "./base/element.module.base";
import { ElementService } from "./element.service";
import { ElementController } from "./element.controller";
import { ElementResolver } from "./element.resolver";

@Module({
  imports: [ElementModuleBase],
  controllers: [ElementController],
  providers: [ElementService, ElementResolver],
  exports: [ElementService],
})
export class ElementModule {}
