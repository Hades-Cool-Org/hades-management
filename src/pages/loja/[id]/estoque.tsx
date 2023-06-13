import BaseCard from "@/components/Card/BaseCard";
import UserContext from "@/components/Context";
import DeleteIcon from "@/components/DeleteIcon";
import EditIcon from "@/components/EditIcon";
import SEO from "@/components/Head";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";
import { Store } from "@/types/types";
import { BASE_API } from "@/utils/api";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import React, { useContext } from "react";

export default function Estoque() {
  const { state } = useContext(UserContext);
  let { data } = useFetch(`${BASE_API}/stock/store/${state?.store?.id}`);
  const { deleteItem } = useRequest();

  function removeItem<T>(arr: Array<T>, value: T): void {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    data = arr;
  }

  const handleDeleteStock = (stock: Store) => {
    deleteItem(`${BASE_API}/store${stock?.id}`, removeItem(data?.items, stock));
  };

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
                <BaseCard key={index}>
                  <CardContent>
                    <Typography>Nome: {item.name}</Typography>
                    <Divider flexItem />
                    <Box className="card-box-bottom">
                      <Box>
                        <Typography>Preço médio: {item.avg_price}</Typography>
                        <Typography>
                          Quantidade atual: {item.current}
                        </Typography>
                      </Box>
                      <Box className="card-button-box">
                        <EditIcon />
                        <DeleteIcon
                          handleClick={() => {
                            handleDeleteStock(item);
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </BaseCard>
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
