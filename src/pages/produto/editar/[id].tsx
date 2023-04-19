import React, { useEffect, useState } from "react";

import styles from "@/styles/AuthenticationPage.module.css";
import { Button, TextField } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";
import { addProduct, getProduct } from "../../../utils/apis";

export default function AddProduct() {
  const [name, setName] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const router = useRouter();

  async function fetchProduct() {
    const { id } = router.query;
    return await getProduct(id);
  }

  useEffect(() => {
    if (router.isReady) {
      fetchProduct().then((response) => {
        setName(response?.data.name);
        setDetails(response?.data.details);
      });
    }
  }, [router.isReady]);

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
