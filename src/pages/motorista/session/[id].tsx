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
      <Button variant="contained" onClick={handleDeleteClick}>
        Fechar Sessão
      </Button>
    </main>
  );
}
