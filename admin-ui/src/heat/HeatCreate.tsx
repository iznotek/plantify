import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const HeatCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Color" source="color" />
        <TextInput label="Name" source="name" />
      </SimpleForm>
    </Create>
  );
};
