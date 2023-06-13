import BaseCard from "@/components/Card/BaseCard";
import OrderCard from "@/components/Card/OrderCard";
import UserContext from "@/components/Context";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";
import { BASE_API } from "@/utils/api";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export default function Session() {
  const { deleteItem, post } = useRequest();

  const router = useRouter();

  const { state, setState } = useContext(UserContext);

  const [selectedOrder, setSelectedOrder] = useState<any>({});
  const { data, error, loading } = useFetch(BASE_API + "/orders");

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
      items: selectedOrder?.items?.map((item: any) => ({
        product_id: item.product_id,
        store_id: item.store_id,
        quantity: item.quantity,
        total: item.total,
      })),
    };
    post(`${BASE_API}/deliveries`, body, (res: any) => {
      router.push("/entregas");
    });
  };

  const handleDeleteClick = () => {
    deleteItem(
      `${BASE_API}/deliveries/sessions/${state?.session?.id}`,
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
                <BaseCard>
                  <Box>
                    <Typography>{order.state}</Typography>
                    <Typography>{order.user.name}</Typography>
                    <Typography>{order.vendor.name}</Typography>
                  </Box>
                </BaseCard>
              }
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <Box className="footer">
        <Button variant="contained" onClick={handleDeliveryClick}>
          Iniciar Entrega
        </Button>
        <Button variant="contained" onClick={handleDeleteClick}>
          Fechar Sessão
        </Button>
      </Box>
    </main>
  );
}
