import UserContext from "@/components/Context";
import TextFieldStandard from "@/components/TextField";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { SetStateAction, useContext, useEffect, useState } from "react";

export default function Entrega() {
  const { post } = useRequest();

  const [body, setBody] = useState({
    delivery_id: "",
    store_id: "",
    items: [],
  });
  const { state } = useContext(UserContext);

  useEffect(() => {
    setBody((prevState: any) => ({
      ...prevState,
      delivery_id: state.delivery.id,
      store_id: 1,
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
    console.log(res);
  };

  const handleConferenceClick = () => {
    post("http://localhost:3333/v1/conference", body, submitCallback);
  };

  return (
    <main className="main">
      <Box>
        <Typography>Estado da entrega{state?.delivery?.state}</Typography>
        <Typography>Início da entrega{state?.delivery?.start_date}</Typography>
      </Box>
      {state?.delivery?.items &&
        state?.delivery?.items.map((item: any, index: number) => {
          return (
            <Card key={index}>
              <CardContent>
                <Typography>{item.name}</Typography>
                <TextFieldStandard
                  label={"Quantidade"}
                  fieldName={item.product_id}
                  handleChange={handleChange}
                />
              </CardContent>
            </Card>
          );
        })}
      <Button variant="contained" onClick={handleConferenceClick}>
        Finalizar
      </Button>
    </main>
  );
}
