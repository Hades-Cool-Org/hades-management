import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";
import useRequest from "@/hooks/useRequest";
import UserContext from "@/components/Context";
import SEO from "@/components/Head";
import { BASE_API } from "@/utils/api";

export default function EditStore() {
  const [body, setBody] = useState({
    name: "",
    address: "",
  });

  const { state } = useContext(UserContext);

  const router = useRouter();

  const { loadingRequest, error, put, success } = useRequest();

  useEffect(() => {
    setBody((prevState) => ({
      ...prevState,
      name: state.store.name,
      address: state.store.address,
    }));
  }, []);

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const reqBody = { ...body, user: { id: state?.user?.id } };
    console.log(reqBody);
    put(`${BASE_API}/store/${state.user.id}`, reqBody);
  };

  useEffect(() => {
    if (success) {
      router.back();
    }
  }, [success]);

  return (
    <>
      <SEO
        pageTitle={"Editar Loja"}
        pageDescription={"Formulário de edição de loja"}
      />
      <main className="main-form">
        <form className="form">
          <TextFieldStandard
            fieldName="name"
            label="Nome"
            value={body.name}
            handleChange={handleChange}
          />
          <TextFieldStandard
            fieldName="address"
            label="Endereço"
            value={body.address}
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
