import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Root.module.css";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/components/Context";
import { Box, Card, Typography } from "@mui/material";
import useFetch from "@/hooks/useFetch";
import BaseCard from "@/components/Card/BaseCard";
import Link from "next/link";
import { BASE_API } from "@/utils/api";
import { Session } from "@/types/types";

const inter = Inter({ subsets: ["latin"] });

export default function Root() {
  const { state, setState } = useContext(UserContext);
  const [currentSession, setCurrentSession] = useState<any | null>(null);
  const { data, error, loading } = useFetch(
    BASE_API + "/deliveries/sessions?active=true"
  );

  const { data: balanceData } = useFetch(
    `${BASE_API}/balance/${state?.user?.id}`
  );

  console.log(balanceData);

  useEffect(() => {
    const session = data?.sessions?.find((session: Session) => {
      return session.user.id == state?.user?.id;
    });
    if (session) {
      setCurrentSession(session);
    }
  }, [data, state]);

  const handleSessionClick = () => {
    setState((prevState: any) => ({
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
