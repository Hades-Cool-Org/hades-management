import * as React from "react";
import axios from "axios";

import styles from "@/styles/AuthenticationPage.module.css";
import { Button, TextField } from "@mui/material";

export default function EditProfile() {
  const [name, setName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");

  //todo: clear this stuff
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const body = {
      name: name,
      email: "guilhermeX@gmail.com",
      phone: phone,
      password: "guilherme",
      roles: [
        {
          name: "admin",
        },
        {
          name: "castor",
        },
      ],
    };
    const data = await axios.put("http://localhost:3333/v1/users/1", body);
    console.log(data);
  };

  return (
    <main className={styles.main}>
      <form>
        <TextField
          id="standard-basic"
          label="Username"
          variant="standard"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="(19)00000-0000"
          variant="standard"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Salvar
        </Button>
      </form>
    </main>
  );
}
