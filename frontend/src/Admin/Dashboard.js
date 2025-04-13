import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
} from "react-admin";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="status" />
      <TextField source="role" />
    </Datagrid>
  </List>
);

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="status" />
      <TextInput source="role" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="password" />
      <TextInput source="phone" />
      <TextInput source="status" />
      <TextInput source="role" />
    </SimpleForm>
  </Create>
);
