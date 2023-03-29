import React, { useState } from "react";
import axios from "axios";

import styles from "@/styles/AuthenticationPage.module.css";
import { Button } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";

export default function AddProduct() {
  const [name, setName] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const body = {
      name,
      details,
      image_url: "blablabla",
      measuring_unit: "UN",
    };
    const data = await axios
      .post("http://localhost:3333/v1/products", body)
      .then((response) => {
        if (response.status === 201) {
          router.back();
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
        <TextFieldStandard label="Nome" handleChange={setName} />
        <TextFieldStandard label="Detalhes" handleChange={setDetails} />
        <Button variant="contained" onClick={handleSubmit}>
          Salvar
        </Button>
      </form>
    </main>
  );
}
