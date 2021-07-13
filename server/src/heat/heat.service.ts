import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { HeatServiceBase } from "./base/heat.service.base";

@Injectable()
export class HeatService extends HeatServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
