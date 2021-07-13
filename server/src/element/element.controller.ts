import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ElementService } from "./element.service";
import { ElementControllerBase } from "./base/element.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("elements")
@common.Controller("elements")
export class ElementController extends ElementControllerBase {
  constructor(
    protected readonly service: ElementService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
