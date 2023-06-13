import React, { useEffect, useState } from "react";

import styles from "@/styles/AuthenticationPage.module.css";
import { Autocomplete, Button, TextField } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
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

  const { id } = router.query;

  const { data, loading, error } = useFetch(`${BASE_API}/products/${id}`);

  const { success, put, loadingRequest } = useRequest();

  console.log(body);

  useEffect(() => {
    setBody((prevState) => ({
      ...prevState,
      name: data ? data["name"] : "",
      details: data ? data["details"] : "",
    }));
    data && handleSelectChange(null, data.measuring_unit);
  }, [data]);

  const handleSelectChange = (event: any, newValue: string | null) => {
    setBody((prevState) => ({
      ...prevState,
      measuring_unit: newValue !== null ? newValue : "",
    }));
  };

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    put(`${BASE_API}/products/${id}`, body);
  };

  useEffect(() => {
    if (success) {
      router.back();
    }
  }, [success]);

  return (
    <main className={"main-form"}>
      <form className="form">
        <TextFieldStandard
          label="Nome"
          value={body.name}
          handleChange={handleChange}
          fieldName="name"
        />
        <TextFieldStandard
          label="Detalhes"
          value={body.details}
          handleChange={handleChange}
          fieldName={"details"}
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
