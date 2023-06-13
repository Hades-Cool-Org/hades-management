import OrderCard from "@/components/Card/OrderCard";
import UserContext from "@/components/Context";
import useFetch from "@/hooks/useFetch";
import { BASE_API } from "@/utils/api";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";

export default function Orders() {
  const { data, error, loading } = useFetch(BASE_API + "/orders");

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
      <Link href={{ pathname: "/fornecedores" }}>
        <Box className="footer">
          <Button variant="contained">Adicionar pedido</Button>
        </Box>
      </Link>
    </main>
  );
}
