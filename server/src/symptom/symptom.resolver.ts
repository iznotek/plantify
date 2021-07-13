import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { SymptomResolverBase } from "./base/symptom.resolver.base";
import { Symptom } from "./base/Symptom";
import { SymptomService } from "./symptom.service";

@graphql.Resolver(() => Symptom)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SymptomResolver extends SymptomResolverBase {
  constructor(
    protected readonly service: SymptomService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
