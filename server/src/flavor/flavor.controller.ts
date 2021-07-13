import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { FlavorService } from "./flavor.service";
import { FlavorControllerBase } from "./base/flavor.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("flavors")
@common.Controller("flavors")
export class FlavorController extends FlavorControllerBase {
  constructor(
    protected readonly service: FlavorService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
