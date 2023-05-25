import OrderCard from "@/components/Card/OrderCard";
import UserContext from "@/components/Context";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export default function Session() {
  const { deleteItem, post } = useRequest();

  const router = useRouter();

  const { state, setState } = useContext(UserContext);

  const [selectedOrder, setSelectedOrder] = useState<any>({});
  const { data, error, loading } = useFetch("http://localhost:3333/v1/orders");

  const handleOrderSelect = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setSelectedOrder(newValue);
  };

  const deleteSessionCallBack = () => {
    router.back();
  };

  const handleDeliveryClick = () => {
    const body = {
      order: { id: selectedOrder.id },
      session: { id: state?.session?.id },
      items: selectedOrder.items.map((item: any) => ({
        product_id: item.product_id,
        store_id: item.store_id,
        quantity: item.quantity,
        total: item.total,
      })),
    };
    post(`http://localhost:3333/v1/deliveries`, body, (res: any) => {
      router.push("entregas");
    });
  };

  const handleDeleteClick = () => {
    deleteItem(
      `http://localhost:3333/v1/deliveries/sessions/${state?.session?.id}`,
      deleteSessionCallBack
    );
  };

  return (
    <main className="main">
      <ToggleButtonGroup
        color="primary"
        exclusive
        aria-label="Platform"
        value={selectedOrder}
        onChange={handleOrderSelect}
        orientation="vertical"
      >
        {data?.orders?.map((order: any, index: number) => {
          return (
            <ToggleButton value={order} key={index}>
              {
                <>
                  <h1>{order.id}</h1>
                  <h2>{order.state}</h2>
                  <h2>{order.user.name}</h2>
                  <h2>{order.vendor.name}</h2>
                </>
              }
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <Button variant="contained" onClick={handleDeliveryClick}>
        Iniciar Entrega
      </Button>
      <Button variant="contained" onClick={handleDeleteClick}>
        Fechar Sessão
      </Button>
    </main>
  );
}
