import React, { useState, useEffect } from "react";

import styles from "@/styles/AuthenticationPage.module.css";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";
import useRequest from "@/hooks/useRequest";
import { BASE_API } from "@/utils/api";

export default function AddProduct() {
  const [body, setBody] = useState({
    name: "",
    details: "",
    image_url: "blablabla",
    measuring_unit: "",
  });

  const router = useRouter();

  const { loadingRequest, error, post, success } = useRequest();

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: any, newValue: string | null) => {
    setBody((prevState) => ({
      ...prevState,
      measuring_unit: newValue !== null ? newValue : "",
    }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    post(BASE_API + "/products", body);
  };

  useEffect(() => {
    console.log(body);
  }, [body]);

  useEffect(() => {
    if (success) {
      router.back();
    }
  }, [success, router]);

  return (
    <main className="main-form">
      <form className="form">
        <TextFieldStandard
          required
          fieldName="name"
          label="Nome"
          handleChange={handleChange}
        />
        <TextFieldStandard
          required
          fieldName="details"
          label="Detalhes"
          handleChange={handleChange}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Caixas", "Kilogramas", "Unidades"]}
          sx={{ width: 300, paddingTop: 2 }}
          onChange={handleSelectChange}
          renderInput={(params) => (
            <TextField {...params} label="Unidade de Medida *" />
          )}
        />
      </form>

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loadingRequest}
      >
        Salvar
      </Button>
    </main>
  );
}
