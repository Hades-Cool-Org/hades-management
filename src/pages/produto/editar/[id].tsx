import React, { useEffect, useState } from "react";

import styles from "@/styles/AuthenticationPage.module.css";
import { Button, TextField } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";
import { addProduct } from "../../../utils/apis";
import useFetch from "@/utils/useFetch";

export default function AddProduct() {
  const [name, setName] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const router = useRouter();

  const { id } = router.query;

  const { data, loading, error } = useFetch(
    `http://localhost:3333/v1/products/${id}`
  );

  useEffect(() => {
    setName(data?.name);
    setDetails(data?.details);
  }, [data]);

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const body = {
      name,
      details,
      image_url: "blablabla",
      measuring_unit: "UN",
    };
    addProduct(body, router.back);
  };

  return (
    <main className={styles.main}>
      <form>
        <TextFieldStandard label="Nome" value={name} handleChange={setName} />
        <TextFieldStandard
          label="Detalhes"
          value={details}
          handleChange={setDetails}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Salvar
        </Button>
      </form>
    </main>
  );
}
