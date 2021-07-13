import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { HeatService } from "./heat.service";
import { HeatControllerBase } from "./base/heat.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("heats")
@common.Controller("heats")
export class HeatController extends HeatControllerBase {
  constructor(
    protected readonly service: HeatService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
