import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { FoodService } from "./food.service";
import { FoodControllerBase } from "./base/food.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("foods")
@common.Controller("foods")
export class FoodController extends FoodControllerBase {
  constructor(
    protected readonly service: FoodService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
