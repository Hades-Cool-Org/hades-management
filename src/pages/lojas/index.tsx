import StoreCard from "@/components/Card/StoreCard";
import useFetch from "@/hooks/useFetch";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function Lojas() {
  const { data } = useFetch("http://localhost:3333/v1/store");
  console.log(data);

  const router = useRouter();

  const handleAddStoreClick = () => {
    router.push("lojas/adicionar");
  };

  return (
    <main className="main">
      {data &&
        data.stores.map((store, index: number) => {
          return (
            <StoreCard
              key={index}
              store={store}
              index={0}
              handleStoresQuantity={undefined}
              vehicles={undefined}
              handleVehicleChange={undefined}
            />
          );
        })}
      <Button variant="contained" onClick={handleAddStoreClick}>
        Adicionar Loja
      </Button>
    </main>
  );
}
