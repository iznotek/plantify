import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const FlavorEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Name" source="name" />
      </SimpleForm>
    </Edit>
  );
};
