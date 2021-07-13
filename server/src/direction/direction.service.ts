import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DirectionServiceBase } from "./base/direction.service.base";

@Injectable()
export class DirectionService extends DirectionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
