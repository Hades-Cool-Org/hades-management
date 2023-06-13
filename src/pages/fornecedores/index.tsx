import React, { useContext } from "react";
import Head from "next/head";
import VendorCard from "@/components/Card/VendorCard";
import {
  Box,
  Button,
  createTheme,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Link from "next/link";
import UserContext from "@/components/Context";
import useFetch from "@/hooks/useFetch";
import styles from "@/styles/BuyerPage.module.css";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/router";
import { BASE_API } from "@/utils/api";

const theme = createTheme({
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          backgroundColor: "transparent",
          borderRadius: "0",
        },
      },
    },
  },
});

const Fornecedores = () => {
  const { data, loading, error } = useFetch(BASE_API + "/vendors");

  const { state, setState } = useContext(UserContext);

  const { post, success, error: requestError } = useRequest();

  const router = useRouter();

  if (loading) return <h1>Loading</h1>;

  if (error) console.log(error);

  const postCallback = (res: any) => {
    setState((prevState) => ({
      ...prevState,
      order: res,
    }));
    router.push(`/pedidos/${res.id}`);
  };

  const handleClick = (vendor: any) => {
    const body = {
      vendor: { id: vendor?.id },
      user: { id: state?.user?.id },
    };
    post(BASE_API + "/orders", body, postCallback);
  };

  return (
    <>
      <Head>
        <title>Fornecedores</title>
      </Head>
      <main className="main">
        <Box>
          {
            // @ts-ignore: Object is possibly 'null'
            data?.vendors.map((vendor, index) => {
              return (
                <VendorCard
                  key={index}
                  vendor={vendor}
                  index={index}
                  handleClick={handleClick}
                />
              );
            })
          }
        </Box>
        <Box className="footer">
          <Link href={"/fornecedor/adicionar"}>
            <Button variant="contained">Adicionar Fornecedor</Button>
          </Link>
        </Box>
      </main>
    </>
  );
};

export default Fornecedores;
