import { PrismaService } from "nestjs-prisma";
import { Prisma, Recipe, Food } from "@prisma/client";

export class RecipeServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.RecipeFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RecipeFindManyArgs>
  ): Promise<number> {
    return this.prisma.recipe.count(args);
  }

  async findMany<T extends Prisma.RecipeFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RecipeFindManyArgs>
  ): Promise<Recipe[]> {
    return this.prisma.recipe.findMany(args);
  }
  async findOne<T extends Prisma.RecipeFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RecipeFindUniqueArgs>
  ): Promise<Recipe | null> {
    return this.prisma.recipe.findUnique(args);
  }
  async create<T extends Prisma.RecipeCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RecipeCreateArgs>
  ): Promise<Recipe> {
    return this.prisma.recipe.create<T>(args);
  }
  async update<T extends Prisma.RecipeUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RecipeUpdateArgs>
  ): Promise<Recipe> {
    return this.prisma.recipe.update<T>(args);
  }
  async delete<T extends Prisma.RecipeDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.RecipeDeleteArgs>
  ): Promise<Recipe> {
    return this.prisma.recipe.delete(args);
  }

  async findFoods(
    parentId: string,
    args: Prisma.FoodFindManyArgs
  ): Promise<Food[]> {
    return this.prisma.recipe
      .findUnique({
        where: { id: parentId },
      })
      .foods(args);
  }
}
