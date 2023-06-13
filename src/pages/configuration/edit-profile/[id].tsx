import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/AuthenticationPage.module.css";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import useRequest from "@/hooks/useRequest";
import UserContext from "@/components/Context";
import { useRouter } from "next/router";
import { BASE_API } from "@/utils/api";
interface Role {
  name: string;
}

export default function EditProfile() {
  const [body, setBody] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { put, success } = useRequest();

  const { state } = useContext(UserContext);

  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: any, newValue: { value: string }[]) => {
    const rolesBody = newValue.map((role) => ({ name: role.value }));
    console.log(rolesBody);
    setBody((prevState) => ({
      ...prevState,
      roles: rolesBody,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    put(BASE_API + "/users/1", body);
  };

  useEffect(() => {
    if (success) {
      router.push("/");
    }
  }, [success, router]);

  return (
    <main className="main-form">
      <Box className="form-container">
        <form className="form">
          <TextFieldStandard
            label="Usuário"
            handleChange={handleChange}
            fieldName={"name"}
            value={body.name}
          />
          <TextFieldStandard
            label="Email"
            handleChange={handleChange}
            fieldName={"email"}
            value={body.email}
          />
          <TextFieldStandard
            label="Telefone"
            handleChange={handleChange}
            fieldName={"phone"}
            value={body.phone}
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
            disablePortal
            multiple
            id="combo-box"
            options={[
              { name: "Administrador", value: "admin" },
              { name: "Comprador", value: "buyer" },
              { name: "Motorista", value: "driver" },
              { name: "Gerente", value: "manager" },
            ]}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300, paddingTop: 2 }}
            onChange={handleSelectChange}
            renderInput={(params) => <TextField {...params} label="Papéis *" />}
          />
        </form>
      </Box>
      <Box className={"footer"}>
        <Button variant="contained" onClick={handleSubmit}>
          Salvar
        </Button>
      </Box>
    </main>
  );
}
