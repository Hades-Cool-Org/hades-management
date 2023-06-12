import UserContext from "@/components/Context";
import useFetch from "@/hooks/useFetch";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";

export default function Entregas() {
  const { data } = useFetch("http://localhost:3333/v1/deliveries");

  const { setState } = useContext(UserContext);

  const handleLinkClick = (delivery: any) => {
    setState((prevState: any) => ({
      ...prevState,
      delivery: delivery,
    }));
  };

  return (
    <main className="main">
      Entregas
      {data &&
        data?.deliveries?.map((delivery: any, index: number) => {
          return (
            <Link
              href={{ pathname: `/entregas/${delivery.id}` }}
              key={index}
              onClick={() => {
                handleLinkClick(delivery);
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
