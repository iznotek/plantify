import { Module } from "@nestjs/common";
import { SymptomModuleBase } from "./base/symptom.module.base";
import { SymptomService } from "./symptom.service";
import { SymptomController } from "./symptom.controller";
import { SymptomResolver } from "./symptom.resolver";

@Module({
  imports: [SymptomModuleBase],
  controllers: [SymptomController],
  providers: [SymptomService, SymptomResolver],
  exports: [SymptomService],
})
export class SymptomModule {}
