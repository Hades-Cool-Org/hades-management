import React, { useContext } from "react";
import Head from "next/head";
import VendorCard from "@/components/Card/VendorCard";
import {
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

const Comprador = () => {
  const { data, loading, error } = useFetch("http://localhost:3333/v1/vendors");

  let context = useContext(UserContext);

  if (loading) return <h1>Loading</h1>;

  if (error) console.log(error);

  return (
    <>
      <Head>
        <title>Comprador</title>
      </Head>
      <main className="main">
        <Typography variant="h5">Fornecedores</Typography>
        <section className={styles.cards}>
          <TextField
            variant="standard"
            label="Buscar Fornecedor"
            className={styles.search}
          />
          <ThemeProvider theme={theme}>
            {
              // @ts-ignore: Object is possibly 'null'
              data?.vendors.map((vendor, index) => {
                return (
                  <VendorCard
                    vendor={vendor}
                    index={index}
                    handleClick={context.setState}
                  />
                );
              })
            }
          </ThemeProvider>
        </section>
        <Link href={"/fornecedor/adicionar"}>
          <Button variant="contained">Adicionar</Button>
        </Link>
      </main>
    </>
  );
};

export default Comprador;
