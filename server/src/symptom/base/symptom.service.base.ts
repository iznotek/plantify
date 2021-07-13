import { PrismaService } from "nestjs-prisma";
import { Prisma, Symptom, Food } from "@prisma/client";

export class SymptomServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.SymptomFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SymptomFindManyArgs>
  ): Promise<number> {
    return this.prisma.symptom.count(args);
  }

  async findMany<T extends Prisma.SymptomFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SymptomFindManyArgs>
  ): Promise<Symptom[]> {
    return this.prisma.symptom.findMany(args);
  }
  async findOne<T extends Prisma.SymptomFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SymptomFindUniqueArgs>
  ): Promise<Symptom | null> {
    return this.prisma.symptom.findUnique(args);
  }
  async create<T extends Prisma.SymptomCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SymptomCreateArgs>
  ): Promise<Symptom> {
    return this.prisma.symptom.create<T>(args);
  }
  async update<T extends Prisma.SymptomUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SymptomUpdateArgs>
  ): Promise<Symptom> {
    return this.prisma.symptom.update<T>(args);
  }
  async delete<T extends Prisma.SymptomDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SymptomDeleteArgs>
  ): Promise<Symptom> {
    return this.prisma.symptom.delete(args);
  }

  async getFood(parentId: string): Promise<Food | null> {
    return this.prisma.symptom
      .findUnique({
        where: { id: parentId },
      })
      .food();
  }
}
