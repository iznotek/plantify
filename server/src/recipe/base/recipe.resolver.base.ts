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
import { CreateRecipeArgs } from "./CreateRecipeArgs";
import { UpdateRecipeArgs } from "./UpdateRecipeArgs";
import { DeleteRecipeArgs } from "./DeleteRecipeArgs";
import { RecipeFindManyArgs } from "./RecipeFindManyArgs";
import { RecipeFindUniqueArgs } from "./RecipeFindUniqueArgs";
import { Recipe } from "./Recipe";
import { FoodFindManyArgs } from "../../food/base/FoodFindManyArgs";
import { Food } from "../../food/base/Food";
import { RecipeService } from "../recipe.service";

@graphql.Resolver(() => Recipe)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class RecipeResolverBase {
  constructor(
    protected readonly service: RecipeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Recipe",
    action: "read",
    possession: "any",
  })
  async _recipesMeta(
    @graphql.Args() args: RecipeFindManyArgs
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

  @graphql.Query(() => [Recipe])
  @nestAccessControl.UseRoles({
    resource: "Recipe",
    action: "read",
    possession: "any",
  })
  async recipes(
    @graphql.Args() args: RecipeFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Recipe[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Recipe",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Recipe, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Recipe",
    action: "read",
    possession: "own",
  })
  async recipe(
    @graphql.Args() args: RecipeFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Recipe | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Recipe",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Recipe)
  @nestAccessControl.UseRoles({
    resource: "Recipe",
    action: "create",
    possession: "any",
  })
  async createRecipe(
    @graphql.Args() args: CreateRecipeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Recipe> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Recipe",
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
        `providing the properties: ${properties} on ${"Recipe"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Recipe)
  @nestAccessControl.UseRoles({
    resource: "Recipe",
    action: "update",
    possession: "any",
  })
  async updateRecipe(
    @graphql.Args() args: UpdateRecipeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Recipe | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Recipe",
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
        `providing the properties: ${properties} on ${"Recipe"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Recipe)
  @nestAccessControl.UseRoles({
    resource: "Recipe",
    action: "delete",
    possession: "any",
  })
  async deleteRecipe(
    @graphql.Args() args: DeleteRecipeArgs
  ): Promise<Recipe | null> {
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
    resource: "Recipe",
    action: "read",
    possession: "any",
  })
  async foods(
    @graphql.Parent() parent: Recipe,
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
