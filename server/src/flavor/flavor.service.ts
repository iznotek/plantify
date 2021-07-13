import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { FlavorServiceBase } from "./base/flavor.service.base";

@Injectable()
export class FlavorService extends FlavorServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
