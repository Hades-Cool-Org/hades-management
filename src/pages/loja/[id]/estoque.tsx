import UserContext from "@/components/Context";
import SEO from "@/components/Head";
import useFetch from "@/hooks/useFetch";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useContext } from "react";

export default function Estoque() {
  const { state } = useContext(UserContext);
  const { data } = useFetch(
    `http://localhost:3333/v1/stock/store/${state.store.id}`
  );

  return (
    <>
      <SEO
        pageTitle={"Estoque"}
        pageDescription={`Estoque da loja ${state?.store?.name}`}
      />
      <main className="main">
        <Box>
          {data ? (
            data?.items?.map((item: any, index: number) => {
              return (
                <Card key={index}>
                  <CardContent>
                    <Typography>Nome: {item.name}</Typography>
                    <Typography>Preço médio: {item.avg_price}</Typography>
                    <Typography>Quantidade atual: {item.current}</Typography>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Typography>Sem estoque no momento</Typography>
          )}
        </Box>
      </main>
    </>
  );
}
