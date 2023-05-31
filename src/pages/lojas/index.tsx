import UserContext from "@/components/Context";
import SEO from "@/components/Head";
import useFetch from "@/hooks/useFetch";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export default function Lojas() {
  const { setState } = useContext(UserContext);
  const { data } = useFetch("http://localhost:3333/v1/store");
  console.log(data);

  const router = useRouter();

  const handleAddStoreClick = () => {
    router.push("lojas/adicionar");
  };
  var cardStyle = {
    display: "block",
    width: "60vw",
    height: "40vw",
  };
  const handleSetStore = (store: any) => {
    setState((prevState: any) => ({
      ...prevState,
      store: store,
    }));
  };

  return (
    <main className="main">
      {data &&
        data?.stores?.map((store: any, index: number) => {
          return (
            <>
              <SEO pageTitle={"Lojas"} pageDescription={"Lista de lojas"} />
              <Card key={index} style={cardStyle}>
                <CardContent>
                  <Typography variant="h5">{store.name}</Typography>
                  <Typography variant="subtitle1">{store.name}</Typography>
                </CardContent>
                <Box>
                  <Link href={{ pathname: `loja/${store.id}` }}>
                    <Button
                      onClick={() => {
                        handleSetStore(store);
                      }}
                      variant="outlined"
                    >
                      Editar
                    </Button>
                  </Link>
                  <Link href={{ pathname: `loja/${store.id}/estoque` }}>
                    <Button
                      onClick={() => {
                        handleSetStore(store);
                      }}
                      variant="outlined"
                    >
                      Estoque
                    </Button>
                  </Link>
                </Box>
              </Card>
            </>
          );
        })}
      <Button variant="contained" onClick={handleAddStoreClick}>
        Adicionar Loja
      </Button>
    </main>
  );
}
