import TextFieldStandard from "@/components/TextField";
import useRequest from "@/hooks/useRequest";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function AdicionarUsuario() {
  const [body, setBody] = useState<{
    name: string;
    email: string;
    phone: string;
    password: string;
    roles: { name: string }[];
  }>({ name: "", email: "", phone: "", password: "", roles: [] });

  const router = useRouter();

  const { post, success, loadingRequest } = useRequest();

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: any, newValue: { value: string }[]) => {
    const rolesBody = newValue.map((role) => ({ name: role.value }));
    setBody((prevState) => ({
      ...prevState,
      roles: rolesBody,
    }));
  };

  const postSaveUserCallback = () => {
    router.back();
  };

  const handleSaveUserClick = () => {
    post("http://localhost:3333/v1/users", body, postSaveUserCallback);
  };

  return (
    <main className="main-form">
      <Box className="form-container">
        <form className="form">
          <TextFieldStandard
            label={"Nome"}
            fieldName={"name"}
            handleChange={handleChange}
            required
          />
          <TextFieldStandard
            label={"Email"}
            fieldName={"email"}
            handleChange={handleChange}
            required
          />
          <TextFieldStandard
            label={"Telefone"}
            fieldName={"phone"}
            handleChange={handleChange}
            required
          />
          <TextFieldStandard
            label={"Senha"}
            fieldName={"password"}
            handleChange={handleChange}
            required
          />
          <Autocomplete
            disablePortal
            multiple
            id="combo-box-demo"
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
      <Box className="footer">
        <Button
          variant="contained"
          disabled={loadingRequest}
          onClick={handleSaveUserClick}
        >
          Salvar
        </Button>
      </Box>
    </main>
  );
}
