import React, { useState } from "react";
import axios from "axios";

import styles from "@/styles/AuthenticationPage.module.css";
import { Button } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";

export default function AddVendor() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [cName, setCName] = useState<string>("");
  const [cPhone, setCPhone] = useState<string>("");
  const [cEmail, setCEmail] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const body = {
      name,
      email,
      phone,
      cnpj,
      type,
      location,
      contact: { name: cName, phone: cPhone, email: cEmail },
    };
    const data = await axios
      .post("http://localhost:3333/v1/vendors", body)
      .then((response) => {
        if (response.status === 201) {
          router.push("/comprador");
          return response;
        }
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
    console.log(data);
  };

  return (
    <main className={styles.main}>
      <form>
        <TextFieldStandard label="Nome do Fornecedor" handleChange={setName} />
        <TextFieldStandard
          label="Email do Fornecedor"
          handleChange={setEmail}
        />
        <TextFieldStandard
          label="Telefone do Fornecedor"
          handleChange={setPhone}
        />
        <TextFieldStandard label="CNPJ do Fornecedor" handleChange={setCnpj} />
        <TextFieldStandard label="Tipo do Fornecedor" handleChange={setType} />
        <TextFieldStandard
          label="Local do Fornecedor"
          handleChange={setLocation}
        />
        <TextFieldStandard label="Nome de Contato" handleChange={setCName} />
        <TextFieldStandard
          label="Telefone de Contato"
          handleChange={setCPhone}
        />
        <TextFieldStandard label="Email de Contato" handleChange={setCEmail} />
        <Button variant="contained" onClick={handleSubmit}>
          Salvar
        </Button>
      </form>
    </main>
  );
}
