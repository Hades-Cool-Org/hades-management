import * as React from "react";
import axios from "axios";

import styles from "@/styles/AuthenticationPage.module.css";
import { Autocomplete, Button, TextField } from "@mui/material";
import TextFieldStandard from "@/components/TextField";

export default function EditProfile() {
  interface Role {
    name: string;
  }

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [roles, setRoles] = React.useState<Role[]>([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const body = {
      name,
      email,
      phone,
      password,
      roles
    };
    const data = await axios.put("http://localhost:3333/v1/users/1", body);
    console.log(data);
  };

  return (
    <main className={styles.main}>
      <form>
        <TextFieldStandard label="Username" handleChange={setName} />
        <TextFieldStandard label="user@address.com" handleChange={setEmail} />
        <TextFieldStandard label="(19)00000-0000" handleChange={setPhone} />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Autocomplete
        multiple
        id="tags-standard"
        options={[{name:'admin'}, {name:'castor'}]}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Roles"
          />
        )}
      />
        <Button variant="contained" onClick={handleSubmit}>
          Salvar
        </Button>
      </form>
    </main>
  );
}
