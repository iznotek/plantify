import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CategoryTitle } from "../category/CategoryTitle";
import { HeatTitle } from "../heat/HeatTitle";

export const FoodCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput
          source="category.id"
          reference="Category"
          label="Category"
        >
          <SelectInput optionText={CategoryTitle} />
        </ReferenceInput>
        <ReferenceInput source="heat.id" reference="Heat" label="Heat">
          <SelectInput optionText={HeatTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
