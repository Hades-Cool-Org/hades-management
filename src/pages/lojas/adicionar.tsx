import React, { useState, useEffect, useContext } from "react";

import styles from "@/styles/AuthenticationPage.module.css";
import { Button } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";
import useRequest from "@/hooks/useRequest";
import UserContext from "@/components/Context";
import SEO from "@/components/Head";
import { BASE_API } from "@/utils/api";

export default function AdicionarLoja() {
  const [body, setBody] = useState({
    name: "",
    address: "",
  });

  const { state } = useContext(UserContext);

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
    const reqBody = { ...body, user: { id: state?.user?.id } };
    post(BASE_API + "/store", reqBody);
  };

  useEffect(() => {
    if (success) {
      router.back();
    }
  }, [success]);

  return (
    <>
      <SEO
        pageTitle={"Adicionar Loja"}
        pageDescription={"Formulário de adição de loja"}
      />
      <main className="main-form">
        <form className="form">
          <TextFieldStandard
            fieldName="name"
            label="Nome"
            handleChange={handleChange}
          />
          <TextFieldStandard
            fieldName="address"
            label="Endereço"
            handleChange={handleChange}
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
    </>
  );
}
