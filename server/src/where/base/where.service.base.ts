import { PrismaService } from "nestjs-prisma";
import { Prisma, Where, Food } from "@prisma/client";

export class WhereServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.WhereFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.WhereFindManyArgs>
  ): Promise<number> {
    return this.prisma.where.count(args);
  }

  async findMany<T extends Prisma.WhereFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.WhereFindManyArgs>
  ): Promise<Where[]> {
    return this.prisma.where.findMany(args);
  }
  async findOne<T extends Prisma.WhereFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.WhereFindUniqueArgs>
  ): Promise<Where | null> {
    return this.prisma.where.findUnique(args);
  }
  async create<T extends Prisma.WhereCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WhereCreateArgs>
  ): Promise<Where> {
    return this.prisma.where.create<T>(args);
  }
  async update<T extends Prisma.WhereUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WhereUpdateArgs>
  ): Promise<Where> {
    return this.prisma.where.update<T>(args);
  }
  async delete<T extends Prisma.WhereDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.WhereDeleteArgs>
  ): Promise<Where> {
    return this.prisma.where.delete(args);
  }

  async findFoods(
    parentId: string,
    args: Prisma.FoodFindManyArgs
  ): Promise<Food[]> {
    return this.prisma.where
      .findUnique({
        where: { id: parentId },
      })
      .foods(args);
  }
}
