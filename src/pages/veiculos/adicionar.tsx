import TextFieldStandard from "@/components/TextField";
import useRequest from "@/hooks/useRequest";
import { Box, Button } from "@mui/material";
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

  return (
    <main className="main-form">
      <form className="form">
        <TextFieldStandard
          fieldName="name"
          label="Nome"
          handleChange={handleChange}
        />
        <TextFieldStandard
          fieldName="type"
          label="Tipo"
          handleChange={handleChange}
        />
      </form>
      <Button variant="contained" onClick={handleClick}>
        Salvar
      </Button>
    </main>
  );
}
