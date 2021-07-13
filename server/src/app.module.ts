import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/project.module";
import { TaskModule } from "./task/task.module";
import { FoodModule } from "./food/food.module";
import { CategoryModule } from "./category/category.module";
import { HeatModule } from "./heat/heat.module";
import { ElementModule } from "./element/element.module";
import { DirectionModule } from "./direction/direction.module";
import { FlavorModule } from "./flavor/flavor.module";
import { WhereModule } from "./where/where.module";
import { SymptomModule } from "./symptom/symptom.module";
import { RecipeModule } from "./recipe/recipe.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    ProjectModule,
    TaskModule,
    FoodModule,
    CategoryModule,
    HeatModule,
    ElementModule,
    DirectionModule,
    FlavorModule,
    WhereModule,
    SymptomModule,
    RecipeModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
