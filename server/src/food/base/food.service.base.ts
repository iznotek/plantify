import { PrismaService } from "nestjs-prisma";

import {
  Prisma,
  Food,
  Direction,
  Element,
  Flavor,
  Recipe,
  Symptom,
  Where,
  Category,
  Heat,
} from "@prisma/client";

export class FoodServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.FoodFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FoodFindManyArgs>
  ): Promise<number> {
    return this.prisma.food.count(args);
  }

  async findMany<T extends Prisma.FoodFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FoodFindManyArgs>
  ): Promise<Food[]> {
    return this.prisma.food.findMany(args);
  }
  async findOne<T extends Prisma.FoodFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.FoodFindUniqueArgs>
  ): Promise<Food | null> {
    return this.prisma.food.findUnique(args);
  }
  async create<T extends Prisma.FoodCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FoodCreateArgs>
  ): Promise<Food> {
    return this.prisma.food.create<T>(args);
  }
  async update<T extends Prisma.FoodUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FoodUpdateArgs>
  ): Promise<Food> {
    return this.prisma.food.update<T>(args);
  }
  async delete<T extends Prisma.FoodDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.FoodDeleteArgs>
  ): Promise<Food> {
    return this.prisma.food.delete(args);
  }

  async findDirection(
    parentId: string,
    args: Prisma.DirectionFindManyArgs
  ): Promise<Direction[]> {
    return this.prisma.food
      .findUnique({
        where: { id: parentId },
      })
      .direction(args);
  }

  async findElement(
    parentId: string,
    args: Prisma.ElementFindManyArgs
  ): Promise<Element[]> {
    return this.prisma.food
      .findUnique({
        where: { id: parentId },
      })
      .element(args);
  }

  async findFlavor(
    parentId: string,
    args: Prisma.FlavorFindManyArgs
  ): Promise<Flavor[]> {
    return this.prisma.food
      .findUnique({
        where: { id: parentId },
      })
      .flavor(args);
  }

  async findRecipe(
    parentId: string,
    args: Prisma.RecipeFindManyArgs
  ): Promise<Recipe[]> {
    return this.prisma.food
      .findUnique({
        where: { id: parentId },
      })
      .recipe(args);
  }

  async findSymptom(
    parentId: string,
    args: Prisma.SymptomFindManyArgs
  ): Promise<Symptom[]> {
    return this.prisma.food
      .findUnique({
        where: { id: parentId },
      })
      .symptom(args);
  }

  async findWhere(
    parentId: string,
    args: Prisma.WhereFindManyArgs
  ): Promise<Where[]> {
    return this.prisma.food
      .findUnique({
        where: { id: parentId },
      })
      .where(args);
  }

  async getCategory(parentId: string): Promise<Category | null> {
    return this.prisma.food
      .findUnique({
        where: { id: parentId },
      })
      .category();
  }

  async getHeat(parentId: string): Promise<Heat | null> {
    return this.prisma.food
      .findUnique({
        where: { id: parentId },
      })
      .heat();
  }
}
