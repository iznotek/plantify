import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { RecipeResolverBase } from "./base/recipe.resolver.base";
import { Recipe } from "./base/Recipe";
import { RecipeService } from "./recipe.service";

@graphql.Resolver(() => Recipe)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class RecipeResolver extends RecipeResolverBase {
  constructor(
    protected readonly service: RecipeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
