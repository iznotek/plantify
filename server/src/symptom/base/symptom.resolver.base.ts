import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateSymptomArgs } from "./CreateSymptomArgs";
import { UpdateSymptomArgs } from "./UpdateSymptomArgs";
import { DeleteSymptomArgs } from "./DeleteSymptomArgs";
import { SymptomFindManyArgs } from "./SymptomFindManyArgs";
import { SymptomFindUniqueArgs } from "./SymptomFindUniqueArgs";
import { Symptom } from "./Symptom";
import { Food } from "../../food/base/Food";
import { SymptomService } from "../symptom.service";

@graphql.Resolver(() => Symptom)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SymptomResolverBase {
  constructor(
    protected readonly service: SymptomService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Symptom",
    action: "read",
    possession: "any",
  })
  async _symptomsMeta(
    @graphql.Args() args: SymptomFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Symptom])
  @nestAccessControl.UseRoles({
    resource: "Symptom",
    action: "read",
    possession: "any",
  })
  async symptoms(
    @graphql.Args() args: SymptomFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Symptom[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Symptom",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Symptom, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Symptom",
    action: "read",
    possession: "own",
  })
  async symptom(
    @graphql.Args() args: SymptomFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Symptom | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Symptom",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Symptom)
  @nestAccessControl.UseRoles({
    resource: "Symptom",
    action: "create",
    possession: "any",
  })
  async createSymptom(
    @graphql.Args() args: CreateSymptomArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Symptom> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Symptom",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Symptom"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        food: args.data.food
          ? {
              connect: args.data.food,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Symptom)
  @nestAccessControl.UseRoles({
    resource: "Symptom",
    action: "update",
    possession: "any",
  })
  async updateSymptom(
    @graphql.Args() args: UpdateSymptomArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Symptom | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Symptom",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Symptom"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          food: args.data.food
            ? {
                connect: args.data.food,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Symptom)
  @nestAccessControl.UseRoles({
    resource: "Symptom",
    action: "delete",
    possession: "any",
  })
  async deleteSymptom(
    @graphql.Args() args: DeleteSymptomArgs
  ): Promise<Symptom | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Food, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Symptom",
    action: "read",
    possession: "any",
  })
  async food(
    @graphql.Parent() parent: Symptom,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Food | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Food",
    });
    const result = await this.service.getFood(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
