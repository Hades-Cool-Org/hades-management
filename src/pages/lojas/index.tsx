import BaseCard from "@/components/Card/BaseCard";
import UserContext from "@/components/Context";
import DeleteIcon from "@/components/DeleteIcon";
import EditIcon from "@/components/EditIcon";
import SEO from "@/components/Head";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";
import { Store } from "@/types/types";
import { BASE_API } from "@/utils/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export default function Lojas() {
  const { setState } = useContext(UserContext);
  let { data } = useFetch(BASE_API + "/store");

  const { deleteItem } = useRequest();

  const router = useRouter();

  const handleAddStoreClick = () => {
    router.push("lojas/adicionar");
  };

  function removeItem<T>(arr: Array<T>, value: T): void {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    data = arr;
  }

  const handleSetStore = (store: any) => {
    setState((prevState: any) => ({
      ...prevState,
      store: store,
    }));
  };

  const handleDeleteStore = (store: Store) => {
    deleteItem(`${BASE_API}/store${store.id}`, removeItem(data?.stores, store));
  };

  return (
    <main className="main">
      <Box className="main-content">
        {data &&
          data?.stores?.map((store: any, index: number) => (
            <>
              <SEO pageTitle={"Lojas"} pageDescription={"Lista de lojas"} />
              <Link
                href={{ pathname: `loja/${store.id}/estoque` }}
                onClick={() => {
                  handleSetStore(store);
                }}
              >
                <BaseCard>
                  <>
                    <Typography variant="h5">{store.name}</Typography>
                    <Divider flexItem />
                    <Box className="card-box-bottom">
                      <Typography variant="subtitle1">{store.name}</Typography>
                      <Box>
                        <Link href={{ pathname: `loja/${store.id}` }}>
                          <EditIcon
                            handleClick={() => {
                              handleSetStore(store);
                            }}
                          />
                        </Link>

                        <DeleteIcon
                          handleClick={() => {
                            handleDeleteStore(store);
                          }}
                        />
                      </Box>
                    </Box>
                  </>
                </BaseCard>
              </Link>
            </>
          ))}
      </Box>
      <Box className="footer">
        <Button variant="contained" onClick={handleAddStoreClick}>
          Adicionar Loja
        </Button>
      </Box>
    </main>
  );
}
