import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { DirectionService } from "./direction.service";
import { DirectionControllerBase } from "./base/direction.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("directions")
@common.Controller("directions")
export class DirectionController extends DirectionControllerBase {
  constructor(
    protected readonly service: DirectionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
