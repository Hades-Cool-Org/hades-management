import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Root.module.css";
import React, { useContext } from "react";
import UserContext from "@/components/Context";
import { Box, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Root() {
  const { state } = useContext(UserContext);
  console.log(state);
  return (
    <>
      <Head>
        <div className={styles.head}></div>
        <title>Lojão Hortifruti</title>
      </Head>
      <main className={styles.main}>
        <Box>
          <Typography variant="h6">Bem vindo {state?.user?.name}</Typography>
          <Typography>Seu saldo é de</Typography>
        </Box>
      </main>
    </>
  );
}
