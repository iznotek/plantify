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
import { CreateHeatArgs } from "./CreateHeatArgs";
import { UpdateHeatArgs } from "./UpdateHeatArgs";
import { DeleteHeatArgs } from "./DeleteHeatArgs";
import { HeatFindManyArgs } from "./HeatFindManyArgs";
import { HeatFindUniqueArgs } from "./HeatFindUniqueArgs";
import { Heat } from "./Heat";
import { FoodFindManyArgs } from "../../food/base/FoodFindManyArgs";
import { Food } from "../../food/base/Food";
import { HeatService } from "../heat.service";

@graphql.Resolver(() => Heat)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class HeatResolverBase {
  constructor(
    protected readonly service: HeatService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Heat",
    action: "read",
    possession: "any",
  })
  async _heatsMeta(
    @graphql.Args() args: HeatFindManyArgs
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

  @graphql.Query(() => [Heat])
  @nestAccessControl.UseRoles({
    resource: "Heat",
    action: "read",
    possession: "any",
  })
  async heats(
    @graphql.Args() args: HeatFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Heat[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Heat",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Heat, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Heat",
    action: "read",
    possession: "own",
  })
  async heat(
    @graphql.Args() args: HeatFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Heat | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Heat",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Heat)
  @nestAccessControl.UseRoles({
    resource: "Heat",
    action: "create",
    possession: "any",
  })
  async createHeat(
    @graphql.Args() args: CreateHeatArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Heat> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Heat",
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
        `providing the properties: ${properties} on ${"Heat"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Heat)
  @nestAccessControl.UseRoles({
    resource: "Heat",
    action: "update",
    possession: "any",
  })
  async updateHeat(
    @graphql.Args() args: UpdateHeatArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Heat | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Heat",
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
        `providing the properties: ${properties} on ${"Heat"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => Heat)
  @nestAccessControl.UseRoles({
    resource: "Heat",
    action: "delete",
    possession: "any",
  })
  async deleteHeat(@graphql.Args() args: DeleteHeatArgs): Promise<Heat | null> {
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

  @graphql.ResolveField(() => [Food])
  @nestAccessControl.UseRoles({
    resource: "Heat",
    action: "read",
    possession: "any",
  })
  async foods(
    @graphql.Parent() parent: Heat,
    @graphql.Args() args: FoodFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Food[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Food",
    });
    const results = await this.service.findFoods(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
