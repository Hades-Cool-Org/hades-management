import React, { useEffect, useState } from "react";

import styles from "@/styles/AuthenticationPage.module.css";
import { Button, TextField } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";

export default function AddProduct() {
  const [body, setBody] = useState({
    name: "",
    details: "",
    image_url: "blablabla",
    measuring_unit: "UN",
  });
  const router = useRouter();

  const { id } = router.query;

  const { data, loading, error } = useFetch(
    `http://localhost:3333/v1/products/${id}`
  );

  const { status, put, loadingRequest } = useRequest();

  console.log("ping");

  useEffect(() => {
    setBody((prevState) => ({
      ...prevState,
      name: data ? data["name"] : "",
      details: data ? data["details"] : "",
    }));
  }, [data]);

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    put(`http://localhost:3333/v1/products/${id}`, body);
  };

  useEffect(() => {
    if (status === 200) {
      router.back();
    }
  }, [status]);

  return (
    <main className={styles.main}>
      <form>
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
