import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { RecipeServiceBase } from "./base/recipe.service.base";

@Injectable()
export class RecipeService extends RecipeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
