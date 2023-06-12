import BaseCard from "@/components/Card/BaseCard";
import UserContext from "@/components/Context";
import useFetch from "@/hooks/useFetch";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Cookie from "js-cookie";

export default function Entregas() {
  const { data } = useFetch("http://localhost:3333/v1/deliveries");

  const { state, setState } = useContext(UserContext);

  const handleLinkClick = (delivery: any) => {
    setState((prevState: any) => ({
      ...prevState,
      delivery: delivery,
    }));
  };

  useEffect(() => {
    return () => {
      Cookie.set("state", JSON.stringify(state));
    };
  }, []);

  console.log(data);

  return (
    <main className="main">
      <Box className="main-content">
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
                <BaseCard key={index}>
                  <>
                    <Typography>Estado: {delivery.state}</Typography>
                    <Typography>{delivery.order.user.name}</Typography>
                    <Typography>
                      Entregador:{delivery.session.user.name}
                    </Typography>
                  </>
                </BaseCard>
              </Link>
            );
          })}
      </Box>
    </main>
  );
}
