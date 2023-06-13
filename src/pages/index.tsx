import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Root.module.css";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/components/Context";
import { Box, Card, Typography } from "@mui/material";
import useFetch from "@/hooks/useFetch";
import BaseCard from "@/components/Card/BaseCard";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Root() {
  const { state, setState } = useContext(UserContext);
  const [currentSession, setCurrentSession] = useState(undefined);
  const { data, error, loading } = useFetch(
    "http://localhost:3333/v1/deliveries/sessions?active=true"
  );

  const { data: balanceData } = useFetch(
    `http://localhost:3333/v1/balance/${state?.user?.id}`
  );

  console.log(balanceData);

  useEffect(() => {
    const session = data?.sessions?.find((session) => {
      return session.user.id == state?.user?.id;
    });
    if (session) {
      setCurrentSession(session);
    }
  }, [data]);

  useEffect(() => {
    console.log(currentSession);
  }, [currentSession]);

  const handleSessionClick = () => {
    setState((prevState) => ({
      ...prevState,
      session: currentSession,
    }));
  };

  return (
    <>
      <Head>
        <div className={styles.head}></div>
        <title>Lojão Hortifruti</title>
      </Head>
      <main className="main">
        <Box className="main-content">
          <Typography variant="h6">Bem vindo {state?.user?.name}</Typography>
          {balanceData && (
            <Typography variant="h4">
              Seu saldo é de R${balanceData?.Amount}
            </Typography>
          )}
        </Box>
        {currentSession && (
          <Link
            href={{ pathname: `motorista/session/${currentSession.id}` }}
            onClick={handleSessionClick}
          >
            <BaseCard>
              <>
                <Typography variant="h6">Sessão Atual:</Typography>
                <Typography>{currentSession.vehicle.name}</Typography>
                <Typography>{currentSession.start_date}</Typography>
              </>
            </BaseCard>
          </Link>
        )}
      </main>
    </>
  );
}
