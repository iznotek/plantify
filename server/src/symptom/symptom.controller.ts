import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SymptomService } from "./symptom.service";
import { SymptomControllerBase } from "./base/symptom.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("symptoms")
@common.Controller("symptoms")
export class SymptomController extends SymptomControllerBase {
  constructor(
    protected readonly service: SymptomService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
