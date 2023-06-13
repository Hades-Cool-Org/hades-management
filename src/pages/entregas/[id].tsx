import BaseCard from "@/components/Card/BaseCard";
import UserContext from "@/components/Context";
import TextFieldStandard from "@/components/TextField";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import { BASE_API } from "@/utils/api";
import { Store } from "@/types/types";

export default function Entrega() {
  const { data } = useFetch(BASE_API + "/store");
  const [stores, setStores] = useState<any[]>([]);

  const { state, setState } = useContext(UserContext);

  useEffect(() => {
    setStores([
      ...new Set(
        state?.delivery?.items.map((item) =>
          data?.stores.find((store: Store) => {
            return store.id === item.store_id;
          })
        )
      ),
    ]);
  }, [state, data]);

  const onClickLink = (store: Store) => {
    setState((prevState) => ({
      ...prevState,
      store: store,
    }));
  };

  useEffect(() => {
    return () => {
      Cookie.set("state", JSON.stringify(state));
    };
  }, []);

  console.log("stores:", stores);

  return (
    <main className="main">
      <Box className="main-content">
        {stores &&
          stores.map((store: Store, index) => {
            return (
              <Link
                key={index}
                href={{ pathname: `/entregas/loja/${store?.id}` }}
                onClick={() => {
                  onClickLink(store);
                }}
              >
                <BaseCard>
                  <Box className="main-content">
                    <Typography>{store?.name}</Typography>
                    <Typography>{store?.address}</Typography>
                  </Box>
                </BaseCard>
              </Link>
            );
          })}
      </Box>
    </main>
  );
}
