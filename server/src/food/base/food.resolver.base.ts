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
import { CreateFoodArgs } from "./CreateFoodArgs";
import { UpdateFoodArgs } from "./UpdateFoodArgs";
import { DeleteFoodArgs } from "./DeleteFoodArgs";
import { FoodFindManyArgs } from "./FoodFindManyArgs";
import { FoodFindUniqueArgs } from "./FoodFindUniqueArgs";
import { Food } from "./Food";
import { DirectionFindManyArgs } from "../../direction/base/DirectionFindManyArgs";
import { Direction } from "../../direction/base/Direction";
import { ElementFindManyArgs } from "../../element/base/ElementFindManyArgs";
import { Element } from "../../element/base/Element";
import { FlavorFindManyArgs } from "../../flavor/base/FlavorFindManyArgs";
import { Flavor } from "../../flavor/base/Flavor";
import { RecipeFindManyArgs } from "../../recipe/base/RecipeFindManyArgs";
import { Recipe } from "../../recipe/base/Recipe";
import { SymptomFindManyArgs } from "../../symptom/base/SymptomFindManyArgs";
import { Symptom } from "../../symptom/base/Symptom";
import { WhereFindManyArgs } from "../../where/base/WhereFindManyArgs";
import { Where } from "../../where/base/Where";
import { Category } from "../../category/base/Category";
import { Heat } from "../../heat/base/Heat";
import { FoodService } from "../food.service";

@graphql.Resolver(() => Food)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class FoodResolverBase {
  constructor(
    protected readonly service: FoodService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "read",
    possession: "any",
  })
  async _foodsMeta(
    @graphql.Args() args: FoodFindManyArgs
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

  @graphql.Query(() => [Food])
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "read",
    possession: "any",
  })
  async foods(
    @graphql.Args() args: FoodFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Food[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Food",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Food, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "read",
    possession: "own",
  })
  async food(
    @graphql.Args() args: FoodFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Food | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Food",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Food)
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "create",
    possession: "any",
  })
  async createFood(
    @graphql.Args() args: CreateFoodArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Food> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Food",
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
        `providing the properties: ${properties} on ${"Food"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        category: {
          connect: args.data.category,
        },

        heat: {
          connect: args.data.heat,
        },
      },
    });
  }

  @graphql.Mutation(() => Food)
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "update",
    possession: "any",
  })
  async updateFood(
    @graphql.Args() args: UpdateFoodArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Food | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Food",
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
        `providing the properties: ${properties} on ${"Food"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          category: {
            connect: args.data.category,
          },

          heat: {
            connect: args.data.heat,
          },
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

  @graphql.Mutation(() => Food)
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "delete",
    possession: "any",
  })
  async deleteFood(@graphql.Args() args: DeleteFoodArgs): Promise<Food | null> {
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

  @graphql.ResolveField(() => [Direction])
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "read",
    possession: "any",
  })
  async direction(
    @graphql.Parent() parent: Food,
    @graphql.Args() args: DirectionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Direction[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Direction",
    });
    const results = await this.service.findDirection(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Element])
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "read",
    possession: "any",
  })
  async element(
    @graphql.Parent() parent: Food,
    @graphql.Args() args: ElementFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Element[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Element",
    });
    const results = await this.service.findElement(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Flavor])
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "read",
    possession: "any",
  })
  async flavor(
    @graphql.Parent() parent: Food,
    @graphql.Args() args: FlavorFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Flavor[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Flavor",
    });
    const results = await this.service.findFlavor(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Recipe])
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "read",
    possession: "any",
  })
  async recipe(
    @graphql.Parent() parent: Food,
    @graphql.Args() args: RecipeFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Recipe[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Recipe",
    });
    const results = await this.service.findRecipe(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Symptom])
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "read",
    possession: "any",
  })
  async symptom(
    @graphql.Parent() parent: Food,
    @graphql.Args() args: SymptomFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Symptom[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Symptom",
    });
    const results = await this.service.findSymptom(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Where])
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "read",
    possession: "any",
  })
  async where(
    @graphql.Parent() parent: Food,
    @graphql.Args() args: WhereFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Where[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Where",
    });
    const results = await this.service.findWhere(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Category, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "read",
    possession: "any",
  })
  async category(
    @graphql.Parent() parent: Food,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Category | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Category",
    });
    const result = await this.service.getCategory(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Heat, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Food",
    action: "read",
    possession: "any",
  })
  async heat(
    @graphql.Parent() parent: Food,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Heat | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Heat",
    });
    const result = await this.service.getHeat(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
