import UserContext from "@/components/Context";
import TextFieldStandard from "@/components/TextField";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";
import { BASE_API } from "@/utils/api";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export default function AdicionarSaldo() {
  const [body, setBody] = useState({ balance: "" });
  const { state } = useContext(UserContext);
  const { data } = useFetch(`${BASE_API}/balance/${state?.balanceUser?.id}`);
  const { post, success } = useRequest();
  const router = useRouter();

  console.log(data);

  const handleSubmit = () => {
    const requestBody = {
      amount: body.balance,
      userId: state?.balanceUser?.id,
    };
    post(`${BASE_API}/balance/${state?.balanceUser?.id}`, requestBody);
  };

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (success) {
      router.back();
    }
  }, [success, router]);

  return (
    <main className="main-form">
      <Typography>Saldo atual R${data?.Amount}</Typography>
      <Box className="form-container">
        <form className="form">
          <TextFieldStandard
            label={"Saldo"}
            fieldName={"balance"}
            handleChange={handleChange}
          />
        </form>
      </Box>
      <Box className="footer">
        <Button variant="contained" onClick={handleSubmit}>
          Adicionar Saldo
        </Button>
      </Box>
    </main>
  );
}
