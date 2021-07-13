import { Module } from "@nestjs/common";
import { WhereModuleBase } from "./base/where.module.base";
import { WhereService } from "./where.service";
import { WhereController } from "./where.controller";
import { WhereResolver } from "./where.resolver";

@Module({
  imports: [WhereModuleBase],
  controllers: [WhereController],
  providers: [WhereService, WhereResolver],
  exports: [WhereService],
})
export class WhereModule {}
