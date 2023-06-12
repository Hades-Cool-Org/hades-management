import UserContext from "@/components/Context";
import TextFieldStandard from "@/components/TextField";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { SetStateAction, useContext, useEffect, useState } from "react";

export default function Entrega() {
  const { post } = useRequest();

  const router = useRouter();

  const [body, setBody] = useState({
    delivery_id: "",
    store_id: "",
    items: [],
  });
  const { state, setState } = useContext(UserContext);

  useEffect(() => {
    setBody((prevState: any) => ({
      ...prevState,
      delivery_id: state?.delivery?.id,
      store_id: state?.store?.id,
    }));
  }, []);

  const handleChange = (name: string, value: string) => {
    if (
      body.items.filter((item: any) => {
        return item.product_id == name;
      }).length > 0
    ) {
      setBody((prevState: any) => ({
        ...prevState,
        items: prevState.items.map((item: any) => {
          if (item.product_id === name) {
            return { ...item, quantity: value };
          }
          return item;
        }),
      }));
    } else {
      setBody((prevState: any) => ({
        ...prevState,
        items: [...prevState.items, { product_id: name, quantity: value }],
      }));
    }
  };

  const submitCallback = (res: any) => {
    router.push(`/loja/${state?.store?.id}/estoque`);
  };

  const handleConferenceClick = () => {
    post("http://localhost:3333/v1/conference", body, submitCallback);
  };

  return (
    <main className="main">
      <Box className="main-content">
        <Typography>
          Produtos a serem entregues à {state?.store?.name}
        </Typography>
        {state?.delivery?.items &&
          state?.delivery?.items.map((item: any, index: number) => {
            if (item.store_id === state?.store?.id)
              return (
                <Card key={index}>
                  <CardContent>
                    <Typography>{item.name}</Typography>
                    <Typography>{item.measuring_unit}</Typography>
                    <Typography>{item.store_id}</Typography>
                    <TextFieldStandard
                      label={"Quantidade"}
                      fieldName={item.product_id}
                      handleChange={handleChange}
                    />
                  </CardContent>
                </Card>
              );
          })}
      </Box>
      <Box className="footer">
        <Button variant="contained" onClick={handleConferenceClick}>
          Salvar
        </Button>
      </Box>
    </main>
  );
}
