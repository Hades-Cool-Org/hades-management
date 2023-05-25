import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "@/styles/AuthenticationPage.module.css";
import { Button } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";
import useRequest from "@/hooks/useRequest";

export default function AddVendor() {
  const router = useRouter();

  const { post, success, loadingRequest, error } = useRequest();

  const [body, setBody] = useState({
    name: "",
    email: "",
    phone: "",
    cnpj: "",
    type: "",
    location: "",
    contact: { name: "", phone: "", email: "" },
  });

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContactChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      contact: { ...prevState.contact, [name]: value },
    }));
  };

  useEffect(() => {
    if (success) router.push("/fornecedores");
  }, [success]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    post("http://localhost:3333/v1/vendors", body);
  };

  if (error) console.log(error);

  return (
    <main className="main-form">
      <form className="form">
        <TextFieldStandard
          label="Nome do Fornecedor"
          fieldName="name"
          handleChange={handleChange}
        />
        <TextFieldStandard
          label="Email do Fornecedor"
          fieldName="email"
          handleChange={handleChange}
        />
        <TextFieldStandard
          label="Telefone do Fornecedor"
          fieldName="phone"
          handleChange={handleChange}
        />
        <TextFieldStandard
          label="CNPJ do Fornecedor"
          fieldName="cnpj"
          handleChange={handleChange}
        />
        <TextFieldStandard
          label="Tipo do Fornecedor"
          fieldName="type"
          handleChange={handleChange}
        />
        <TextFieldStandard
          label="Local do Fornecedor"
          fieldName="location"
          handleChange={handleChange}
        />
        <TextFieldStandard
          label="Nome de Contato"
          fieldName="name"
          handleChange={handleContactChange}
        />
        <TextFieldStandard
          label="Telefone de Contato"
          fieldName="phone"
          handleChange={handleContactChange}
        />
        <TextFieldStandard
          label="Email de Contato"
          fieldName="email"
          handleChange={handleContactChange}
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
