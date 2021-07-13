import { PrismaService } from "nestjs-prisma";
import { Prisma, Element, Food } from "@prisma/client";

export class ElementServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ElementFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ElementFindManyArgs>
  ): Promise<number> {
    return this.prisma.element.count(args);
  }

  async findMany<T extends Prisma.ElementFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ElementFindManyArgs>
  ): Promise<Element[]> {
    return this.prisma.element.findMany(args);
  }
  async findOne<T extends Prisma.ElementFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ElementFindUniqueArgs>
  ): Promise<Element | null> {
    return this.prisma.element.findUnique(args);
  }
  async create<T extends Prisma.ElementCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ElementCreateArgs>
  ): Promise<Element> {
    return this.prisma.element.create<T>(args);
  }
  async update<T extends Prisma.ElementUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ElementUpdateArgs>
  ): Promise<Element> {
    return this.prisma.element.update<T>(args);
  }
  async delete<T extends Prisma.ElementDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ElementDeleteArgs>
  ): Promise<Element> {
    return this.prisma.element.delete(args);
  }

  async findFoods(
    parentId: string,
    args: Prisma.FoodFindManyArgs
  ): Promise<Food[]> {
    return this.prisma.element
      .findUnique({
        where: { id: parentId },
      })
      .foods(args);
  }
}
