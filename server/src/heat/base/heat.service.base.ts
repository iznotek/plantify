import { PrismaService } from "nestjs-prisma";
import { Prisma, Heat, Food } from "@prisma/client";

export class HeatServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.HeatFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.HeatFindManyArgs>
  ): Promise<number> {
    return this.prisma.heat.count(args);
  }

  async findMany<T extends Prisma.HeatFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.HeatFindManyArgs>
  ): Promise<Heat[]> {
    return this.prisma.heat.findMany(args);
  }
  async findOne<T extends Prisma.HeatFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.HeatFindUniqueArgs>
  ): Promise<Heat | null> {
    return this.prisma.heat.findUnique(args);
  }
  async create<T extends Prisma.HeatCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.HeatCreateArgs>
  ): Promise<Heat> {
    return this.prisma.heat.create<T>(args);
  }
  async update<T extends Prisma.HeatUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.HeatUpdateArgs>
  ): Promise<Heat> {
    return this.prisma.heat.update<T>(args);
  }
  async delete<T extends Prisma.HeatDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.HeatDeleteArgs>
  ): Promise<Heat> {
    return this.prisma.heat.delete(args);
  }

  async findFoods(
    parentId: string,
    args: Prisma.FoodFindManyArgs
  ): Promise<Food[]> {
    return this.prisma.heat
      .findUnique({
        where: { id: parentId },
      })
      .foods(args);
  }
}
