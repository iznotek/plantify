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
import { CreateWhereArgs } from "./CreateWhereArgs";
import { UpdateWhereArgs } from "./UpdateWhereArgs";
import { DeleteWhereArgs } from "./DeleteWhereArgs";
import { WhereFindManyArgs } from "./WhereFindManyArgs";
import { WhereFindUniqueArgs } from "./WhereFindUniqueArgs";
import { Where } from "./Where";
import { FoodFindManyArgs } from "../../food/base/FoodFindManyArgs";
import { Food } from "../../food/base/Food";
import { WhereService } from "../where.service";

@graphql.Resolver(() => Where)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class WhereResolverBase {
  constructor(
    protected readonly service: WhereService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Where",
    action: "read",
    possession: "any",
  })
  async _wheresMeta(
    @graphql.Args() args: WhereFindManyArgs
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

  @graphql.Query(() => [Where])
  @nestAccessControl.UseRoles({
    resource: "Where",
    action: "read",
    possession: "any",
  })
  async wheres(
    @graphql.Args() args: WhereFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Where[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Where",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Where, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Where",
    action: "read",
    possession: "own",
  })
  async where(
    @graphql.Args() args: WhereFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Where | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Where",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Where)
  @nestAccessControl.UseRoles({
    resource: "Where",
    action: "create",
    possession: "any",
  })
  async createWhere(
    @graphql.Args() args: CreateWhereArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Where> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Where",
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
        `providing the properties: ${properties} on ${"Where"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Where)
  @nestAccessControl.UseRoles({
    resource: "Where",
    action: "update",
    possession: "any",
  })
  async updateWhere(
    @graphql.Args() args: UpdateWhereArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Where | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Where",
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
        `providing the properties: ${properties} on ${"Where"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Where)
  @nestAccessControl.UseRoles({
    resource: "Where",
    action: "delete",
    possession: "any",
  })
  async deleteWhere(
    @graphql.Args() args: DeleteWhereArgs
  ): Promise<Where | null> {
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
    resource: "Where",
    action: "read",
    possession: "any",
  })
  async foods(
    @graphql.Parent() parent: Where,
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
