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
import { CreateFlavorArgs } from "./CreateFlavorArgs";
import { UpdateFlavorArgs } from "./UpdateFlavorArgs";
import { DeleteFlavorArgs } from "./DeleteFlavorArgs";
import { FlavorFindManyArgs } from "./FlavorFindManyArgs";
import { FlavorFindUniqueArgs } from "./FlavorFindUniqueArgs";
import { Flavor } from "./Flavor";
import { FoodFindManyArgs } from "../../food/base/FoodFindManyArgs";
import { Food } from "../../food/base/Food";
import { FlavorService } from "../flavor.service";

@graphql.Resolver(() => Flavor)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class FlavorResolverBase {
  constructor(
    protected readonly service: FlavorService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Flavor",
    action: "read",
    possession: "any",
  })
  async _flavorsMeta(
    @graphql.Args() args: FlavorFindManyArgs
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

  @graphql.Query(() => [Flavor])
  @nestAccessControl.UseRoles({
    resource: "Flavor",
    action: "read",
    possession: "any",
  })
  async flavors(
    @graphql.Args() args: FlavorFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Flavor[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Flavor",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Flavor, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Flavor",
    action: "read",
    possession: "own",
  })
  async flavor(
    @graphql.Args() args: FlavorFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Flavor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Flavor",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Flavor)
  @nestAccessControl.UseRoles({
    resource: "Flavor",
    action: "create",
    possession: "any",
  })
  async createFlavor(
    @graphql.Args() args: CreateFlavorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Flavor> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Flavor",
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
        `providing the properties: ${properties} on ${"Flavor"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Flavor)
  @nestAccessControl.UseRoles({
    resource: "Flavor",
    action: "update",
    possession: "any",
  })
  async updateFlavor(
    @graphql.Args() args: UpdateFlavorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Flavor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Flavor",
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
        `providing the properties: ${properties} on ${"Flavor"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Flavor)
  @nestAccessControl.UseRoles({
    resource: "Flavor",
    action: "delete",
    possession: "any",
  })
  async deleteFlavor(
    @graphql.Args() args: DeleteFlavorArgs
  ): Promise<Flavor | null> {
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
    resource: "Flavor",
    action: "read",
    possession: "any",
  })
  async foods(
    @graphql.Parent() parent: Flavor,
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
