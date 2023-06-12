import OrderCard from "@/components/Card/OrderCard";
import UserContext from "@/components/Context";
import useFetch from "@/hooks/useFetch";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useContext } from "react";

export default function Orders() {
  const { data, error, loading } = useFetch("http://localhost:3333/v1/orders");

  const { setState } = useContext(UserContext);

  const handleOrderClick = (order: any) => {
    setState((prevState) => ({
      ...prevState,
      order: order,
    }));
  };

  return (
    <main className="main">
      <Box>
        <Typography variant="h5">Lista de Pedidos</Typography>
        {data &&
          data?.orders?.map(
            (
              order: {
                id: string;
                state: string;
                user: { name: string };
                vendor: { name: string };
              },
              index: number
            ) => {
              return (
                <OrderCard
                  id={order.id}
                  state={order.state}
                  userName={order.user.name}
                  vendorName={order.vendor.name}
                  order={order}
                  key={index}
                  handleClick={handleOrderClick}
                />
              );
            }
          )}
      </Box>
      <Box className="footer">
        <Button variant="contained">Adicionar pedido</Button>
      </Box>
    </main>
  );
}
