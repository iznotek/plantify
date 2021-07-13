import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import basicHttpAuthProvider from "./auth-provider/ra-auth-basic-http";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { ProjectList } from "./project/ProjectList";
import { ProjectCreate } from "./project/ProjectCreate";
import { ProjectEdit } from "./project/ProjectEdit";
import { ProjectShow } from "./project/ProjectShow";
import { TaskList } from "./task/TaskList";
import { TaskCreate } from "./task/TaskCreate";
import { TaskEdit } from "./task/TaskEdit";
import { TaskShow } from "./task/TaskShow";
import { FoodList } from "./food/FoodList";
import { FoodCreate } from "./food/FoodCreate";
import { FoodEdit } from "./food/FoodEdit";
import { FoodShow } from "./food/FoodShow";
import { CategoryList } from "./category/CategoryList";
import { CategoryCreate } from "./category/CategoryCreate";
import { CategoryEdit } from "./category/CategoryEdit";
import { CategoryShow } from "./category/CategoryShow";
import { HeatList } from "./heat/HeatList";
import { HeatCreate } from "./heat/HeatCreate";
import { HeatEdit } from "./heat/HeatEdit";
import { HeatShow } from "./heat/HeatShow";
import { ElementList } from "./element/ElementList";
import { ElementCreate } from "./element/ElementCreate";
import { ElementEdit } from "./element/ElementEdit";
import { ElementShow } from "./element/ElementShow";
import { DirectionList } from "./direction/DirectionList";
import { DirectionCreate } from "./direction/DirectionCreate";
import { DirectionEdit } from "./direction/DirectionEdit";
import { DirectionShow } from "./direction/DirectionShow";
import { FlavorList } from "./flavor/FlavorList";
import { FlavorCreate } from "./flavor/FlavorCreate";
import { FlavorEdit } from "./flavor/FlavorEdit";
import { FlavorShow } from "./flavor/FlavorShow";
import { WhereList } from "./where/WhereList";
import { WhereCreate } from "./where/WhereCreate";
import { WhereEdit } from "./where/WhereEdit";
import { WhereShow } from "./where/WhereShow";
import { SymptomList } from "./symptom/SymptomList";
import { SymptomCreate } from "./symptom/SymptomCreate";
import { SymptomEdit } from "./symptom/SymptomEdit";
import { SymptomShow } from "./symptom/SymptomShow";
import { RecipeList } from "./recipe/RecipeList";
import { RecipeCreate } from "./recipe/RecipeCreate";
import { RecipeEdit } from "./recipe/RecipeEdit";
import { RecipeShow } from "./recipe/RecipeShow";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"Plantify"}
        dataProvider={dataProvider}
        authProvider={basicHttpAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="Project"
          list={ProjectList}
          edit={ProjectEdit}
          create={ProjectCreate}
          show={ProjectShow}
        />
        <Resource
          name="Task"
          list={TaskList}
          edit={TaskEdit}
          create={TaskCreate}
          show={TaskShow}
        />
        <Resource
          name="Food"
          list={FoodList}
          edit={FoodEdit}
          create={FoodCreate}
          show={FoodShow}
        />
        <Resource
          name="Category"
          list={CategoryList}
          edit={CategoryEdit}
          create={CategoryCreate}
          show={CategoryShow}
        />
        <Resource
          name="Heat"
          list={HeatList}
          edit={HeatEdit}
          create={HeatCreate}
          show={HeatShow}
        />
        <Resource
          name="Element"
          list={ElementList}
          edit={ElementEdit}
          create={ElementCreate}
          show={ElementShow}
        />
        <Resource
          name="Direction"
          list={DirectionList}
          edit={DirectionEdit}
          create={DirectionCreate}
          show={DirectionShow}
        />
        <Resource
          name="Flavor"
          list={FlavorList}
          edit={FlavorEdit}
          create={FlavorCreate}
          show={FlavorShow}
        />
        <Resource
          name="Where"
          list={WhereList}
          edit={WhereEdit}
          create={WhereCreate}
          show={WhereShow}
        />
        <Resource
          name="Symptom"
          list={SymptomList}
          edit={SymptomEdit}
          create={SymptomCreate}
          show={SymptomShow}
        />
        <Resource
          name="Recipe"
          list={RecipeList}
          edit={RecipeEdit}
          create={RecipeCreate}
          show={RecipeShow}
        />
      </Admin>
    </div>
  );
};

export default App;
