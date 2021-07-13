import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { WhereServiceBase } from "./base/where.service.base";

@Injectable()
export class WhereService extends WhereServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
