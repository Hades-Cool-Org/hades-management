import OrderCard from "@/components/Card/OrderCard";
import useFetch from "@/hooks/useFetch";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function Orders() {
  const { data, error, loading } = useFetch("http://localhost:3333/v1/orders");
  console.log(data);
  return (
    <main className="main">
      <Typography>Orders</Typography>
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
                key={index}
              />
            );
          }
        )}
    </main>
  );
}
