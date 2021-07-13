import { PrismaService } from "nestjs-prisma";
import { Prisma, Flavor, Food } from "@prisma/client";

export class FlavorServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.FlavorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FlavorFindManyArgs>
  ): Promise<number> {
    return this.prisma.flavor.count(args);
  }

  async findMany<T extends Prisma.FlavorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FlavorFindManyArgs>
  ): Promise<Flavor[]> {
    return this.prisma.flavor.findMany(args);
  }
  async findOne<T extends Prisma.FlavorFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.FlavorFindUniqueArgs>
  ): Promise<Flavor | null> {
    return this.prisma.flavor.findUnique(args);
  }
  async create<T extends Prisma.FlavorCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FlavorCreateArgs>
  ): Promise<Flavor> {
    return this.prisma.flavor.create<T>(args);
  }
  async update<T extends Prisma.FlavorUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FlavorUpdateArgs>
  ): Promise<Flavor> {
    return this.prisma.flavor.update<T>(args);
  }
  async delete<T extends Prisma.FlavorDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.FlavorDeleteArgs>
  ): Promise<Flavor> {
    return this.prisma.flavor.delete(args);
  }

  async findFoods(
    parentId: string,
    args: Prisma.FoodFindManyArgs
  ): Promise<Food[]> {
    return this.prisma.flavor
      .findUnique({
        where: { id: parentId },
      })
      .foods(args);
  }
}
