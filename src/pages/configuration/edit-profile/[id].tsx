import React, { useState } from "react";
import styles from "@/styles/AuthenticationPage.module.css";
import { Autocomplete, Button, TextField } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import useRequest from "@/hooks/useRequest";

export default function EditProfile() {
  interface Role {
    name: string;
  }

  const { put } = useRequest();

  const [body, setBody] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    put("http://localhost:3333/v1/users/1", body);
    console.log(body);
  };

  return (
    <main className={styles.main}>
      <form>
        <TextFieldStandard
          label="Username"
          handleChange={handleChange}
          fieldName={"name"}
        />
        <TextFieldStandard
          label="user@address.com"
          handleChange={handleChange}
          fieldName={"email"}
        />
        <TextFieldStandard
          label="(19)00000-0000"
          handleChange={handleChange}
          fieldName={"phone"}
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          onChange={(e) => {
            handleChange("password", e.target.value);
          }}
        />
        <Autocomplete
          multiple
          id="tags-standard"
          options={[{ name: "admin" }, { name: "castor" }]}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Roles" />
          )}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Salvar
        </Button>
      </form>
    </main>
  );
}
