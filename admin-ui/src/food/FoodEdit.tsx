import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CategoryTitle } from "../category/CategoryTitle";
import { HeatTitle } from "../heat/HeatTitle";

export const FoodEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
