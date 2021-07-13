import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { SymptomServiceBase } from "./base/symptom.service.base";

@Injectable()
export class SymptomService extends SymptomServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
