import React, { useState, useEffect } from "react";

import styles from "@/styles/AuthenticationPage.module.css";
import { Button } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";
import useRequest from "@/hooks/useRequest";

export default function AddProduct() {
  const [body, setBody] = useState({
    name: "",
    details: "",
    image_url: "blablabla",
    measuring_unit: "UN",
  });

  const router = useRouter();

  const { loadingRequest, error, post, success } = useRequest();

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    post("http://localhost:3333/v1/products", body);
  };

  useEffect(() => {
    if (success) {
      router.back();
    }
  }, [success]);

  return (
    <main className={styles.main}>
      <form>
        <TextFieldStandard
          fieldName="name"
          label="Nome"
          handleChange={handleChange}
        />
        <TextFieldStandard
          fieldName="details"
          label="Detalhes"
          handleChange={handleChange}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loadingRequest}
        >
          Salvar
        </Button>
      </form>
    </main>
  );
}
