import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const RecipeEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Description" multiline source="description" />
      </SimpleForm>
    </Edit>
  );
};
