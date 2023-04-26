import Head from "next/head";
import styles from "@/styles/Root.module.css";
import { List } from "@mui/material";
import Link from "next/link";
import ListItem from "@/components/ListItem";
import useFetch from "@/hooks/useFetch";
import DriverCard from "@/components/DriverCard";
import { useContext } from "react";
import UserContext from "@/components/Context";

const Gerente = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:3333/v1/deliveries/sessions?active=true"
  );

  const { setState } = useContext(UserContext);

  return (
    <>
      <Head>
        <title>Comprador</title>
      </Head>
      <main className={styles.main}>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
        >
          <Link href={`/gerente`}>
            <ListItem itemText="Estoque" />
          </Link>
          <Link href={"/gerente"}>
            <ListItem itemText="Acompanhamento" />
          </Link>
          <Link href={"/gerente"}>
            <ListItem itemText="Preço" />
          </Link>
          <Link href={"/gerente"}>
            <ListItem itemText="Transferir Produto" />
          </Link>
        </List>
        <h1>Entrega de caminhões</h1>
        {
          // @ts-ignore: Object is possibly 'null'
          data?.sessions.map((session, index) => {
            return (
              <DriverCard
                session={session}
                index={index}
                key={index}
                handleClick={setState}
              />
            );
          })
        }
      </main>
    </>
  );
};

export default Gerente;
