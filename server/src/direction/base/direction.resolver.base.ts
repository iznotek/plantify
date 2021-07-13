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
import { CreateDirectionArgs } from "./CreateDirectionArgs";
import { UpdateDirectionArgs } from "./UpdateDirectionArgs";
import { DeleteDirectionArgs } from "./DeleteDirectionArgs";
import { DirectionFindManyArgs } from "./DirectionFindManyArgs";
import { DirectionFindUniqueArgs } from "./DirectionFindUniqueArgs";
import { Direction } from "./Direction";
import { FoodFindManyArgs } from "../../food/base/FoodFindManyArgs";
import { Food } from "../../food/base/Food";
import { DirectionService } from "../direction.service";

@graphql.Resolver(() => Direction)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DirectionResolverBase {
  constructor(
    protected readonly service: DirectionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Direction",
    action: "read",
    possession: "any",
  })
  async _directionsMeta(
    @graphql.Args() args: DirectionFindManyArgs
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

  @graphql.Query(() => [Direction])
  @nestAccessControl.UseRoles({
    resource: "Direction",
    action: "read",
    possession: "any",
  })
  async directions(
    @graphql.Args() args: DirectionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Direction[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Direction",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Direction, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Direction",
    action: "read",
    possession: "own",
  })
  async direction(
    @graphql.Args() args: DirectionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Direction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Direction",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Direction)
  @nestAccessControl.UseRoles({
    resource: "Direction",
    action: "create",
    possession: "any",
  })
  async createDirection(
    @graphql.Args() args: CreateDirectionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Direction> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Direction",
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
        `providing the properties: ${properties} on ${"Direction"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Direction)
  @nestAccessControl.UseRoles({
    resource: "Direction",
    action: "update",
    possession: "any",
  })
  async updateDirection(
    @graphql.Args() args: UpdateDirectionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Direction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Direction",
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
        `providing the properties: ${properties} on ${"Direction"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Direction)
  @nestAccessControl.UseRoles({
    resource: "Direction",
    action: "delete",
    possession: "any",
  })
  async deleteDirection(
    @graphql.Args() args: DeleteDirectionArgs
  ): Promise<Direction | null> {
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
    resource: "Direction",
    action: "read",
    possession: "any",
  })
  async foods(
    @graphql.Parent() parent: Direction,
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
