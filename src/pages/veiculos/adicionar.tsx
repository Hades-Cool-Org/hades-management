import TextFieldStandard from "@/components/TextField";
import useRequest from "@/hooks/useRequest";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function AdicionarVeiculo() {
  const [body, setBody] = useState({});

  const { post, success } = useRequest();

  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const postVehicleCallback = () => {
    router.back();
  };

  const handleClick = () => {
    post(
      "http://localhost:3333/v1/deliveries/vehicles",
      body,
      postVehicleCallback
    );
  };

  const handleSelectChange = (event: any, newValue: string[]) => {
    setBody((prevState) => ({
      ...prevState,
      type: newValue,
    }));
  };
  console.log(body);
  return (
    <main className="main-form">
      <Box className="form-container">
        <form className="form">
          <TextFieldStandard
            fieldName="name"
            label="Nome"
            handleChange={handleChange}
          />
          <Autocomplete
            disablePortal
            id="combo-box"
            options={["Sedan", "Hatchback", "Van"]}
            getOptionLabel={(option) => option}
            sx={{ width: 300, paddingTop: 2 }}
            onChange={handleSelectChange}
            renderInput={(params) => <TextField {...params} label="Tipo*" />}
          />
        </form>
      </Box>
      <Box className="footer">
        <Button variant="contained" onClick={handleClick}>
          Salvar
        </Button>
      </Box>
    </main>
  );
}
