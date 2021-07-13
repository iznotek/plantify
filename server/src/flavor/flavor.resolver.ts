import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { FlavorResolverBase } from "./base/flavor.resolver.base";
import { Flavor } from "./base/Flavor";
import { FlavorService } from "./flavor.service";

@graphql.Resolver(() => Flavor)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class FlavorResolver extends FlavorResolverBase {
  constructor(
    protected readonly service: FlavorService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
