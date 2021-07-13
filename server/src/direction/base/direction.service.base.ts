import { PrismaService } from "nestjs-prisma";
import { Prisma, Direction, Food } from "@prisma/client";

export class DirectionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.DirectionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DirectionFindManyArgs>
  ): Promise<number> {
    return this.prisma.direction.count(args);
  }

  async findMany<T extends Prisma.DirectionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DirectionFindManyArgs>
  ): Promise<Direction[]> {
    return this.prisma.direction.findMany(args);
  }
  async findOne<T extends Prisma.DirectionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.DirectionFindUniqueArgs>
  ): Promise<Direction | null> {
    return this.prisma.direction.findUnique(args);
  }
  async create<T extends Prisma.DirectionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DirectionCreateArgs>
  ): Promise<Direction> {
    return this.prisma.direction.create<T>(args);
  }
  async update<T extends Prisma.DirectionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DirectionUpdateArgs>
  ): Promise<Direction> {
    return this.prisma.direction.update<T>(args);
  }
  async delete<T extends Prisma.DirectionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.DirectionDeleteArgs>
  ): Promise<Direction> {
    return this.prisma.direction.delete(args);
  }

  async findFoods(
    parentId: string,
    args: Prisma.FoodFindManyArgs
  ): Promise<Food[]> {
    return this.prisma.direction
      .findUnique({
        where: { id: parentId },
      })
      .foods(args);
  }
}
