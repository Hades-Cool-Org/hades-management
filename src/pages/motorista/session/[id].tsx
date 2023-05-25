import OrderCard from "@/components/Card/OrderCard";
import UserContext from "@/components/Context";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export default function Session() {
  const { deleteItem } = useRequest();

  const router = useRouter();

  const { state, setState } = useContext(UserContext);

  const { data, loading, error } = useFetch("http://localhost:3333/v1/orders");

  const deleteSessionCallBack = () => {
    router.back();
  };

  const handleDeleteClick = () => {
    deleteItem(
      `http://localhost:3333/v1/deliveries/sessions/${state?.session?.id}`,
      deleteSessionCallBack
    );
  };

  console.log(data);

  return (
    <main className="main">
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
      <Button variant="contained" onClick={handleDeleteClick}>
        Fechar Sessão
      </Button>
    </main>
  );
}
