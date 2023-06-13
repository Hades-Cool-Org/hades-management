import BaseCard from "@/components/Card/BaseCard";
import useFetch from "@/hooks/useFetch";
import { BASE_API } from "@/utils/api";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";

export default function Acompanhamento() {
  const { data } = useFetch(`${BASE_API}/conference/occurrences`);
  const { data: storeData } = useFetch(`${BASE_API}/store`);

  return (
    <main className="main">
      <Box className="main-content">
        {data &&
          storeData &&
          data?.occurrences?.map((occurrence, index) => {
            return (
              <BaseCard key={index}>
                <Box className="main-content">
                  <Typography variant="h5">
                    {
                      storeData.stores.find((store) => {
                        return store.id === occurrence.store_id;
                      }).name
                    }
                  </Typography>
                  {occurrence.items.map((item, index) => {
                    return (
                      <>
                        <Divider flexItem />
                        <span>
                          Produto: {item.name}, Pêndencia: {item.type},
                          Quantidade: {item.quantity} {/* eslint-disable-line*/}
                        </span>
                        <br />
                      </>
                    );
                  })}
                </Box>
              </BaseCard>
            );
          })}
      </Box>
    </main>
  );
}
