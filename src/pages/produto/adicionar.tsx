import React, { useState } from "react";

import styles from "@/styles/AuthenticationPage.module.css";
import { Button } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";
import { addProduct } from "../../utils/apis";

export default function AddProduct() {
  const [name, setName] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const router = useRouter();

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
        <TextFieldStandard label="Nome" handleChange={setName} />
        <TextFieldStandard label="Detalhes" handleChange={setDetails} />
        <Button variant="contained" onClick={handleSubmit}>
          Salvar
        </Button>
      </form>
    </main>
  );
}
