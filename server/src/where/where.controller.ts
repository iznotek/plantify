import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { WhereService } from "./where.service";
import { WhereControllerBase } from "./base/where.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("wheres")
@common.Controller("wheres")
export class WhereController extends WhereControllerBase {
  constructor(
    protected readonly service: WhereService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
