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
              <Card key={index}>
                <CardContent>
                  <Typography>{order.id}</Typography>
                  <Typography>{order.state}</Typography>
                  <Typography>{order.user.name}</Typography>
                  <Typography>{order.vendor.name}</Typography>
                </CardContent>
              </Card>
            );
          }
        )}
    </main>
  );
}
