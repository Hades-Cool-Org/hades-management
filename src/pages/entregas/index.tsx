import useFetch from "@/hooks/useFetch";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Entregas() {
  const { data } = useFetch("http://localhost:3333/v1/deliveries");

  console.log(data?.deliveries);

  return (
    <main className="main">
      Entregas
      {data &&
        data.deliveries.map((delivery: any, index: number) => {
          return (
            <Link
              href={{ pathname: `/entregas/${delivery.id}` }}
              key={index}
              onClick={() => {
                console.log("test");
              }}
            >
              <Card key={index}>
                <CardContent>
                  <Typography>Estado: {delivery.state}</Typography>
                  <Typography>{delivery.order.user.name}</Typography>
                  <Typography>
                    Entregador:{delivery.session.user.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
    </main>
  );
}
