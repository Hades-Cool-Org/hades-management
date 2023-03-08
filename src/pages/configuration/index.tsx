import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@/components/ListItem";

import styles from "@/styles/AuthenticationPage.module.css";
import Link from "next/link";
import Header from "@/components/Header";

export default function Configuration() {

  return (
    <main className={styles.main}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav">
        <Link href={"/configuration/edit-profile"}>
          <ListItem itemText="Editar Perfil" />
        </Link>
        <Link href={"/configuration/edit-profile"}>
          <ListItem itemText="Carregadores" />
        </Link>
        <Link href={"/configuration/edit-profile"}>
          <ListItem itemText="Ajuda" />
        </Link>
        <Link href={"/login"}>
          <ListItem itemText="Sair" />
        </Link>
      </List>
    </main>
  );
}

Configuration.getLayout = function PageLayout(page: JSX.Element) {
  return (
    <>
      <Header />
      {page}
    </>
  );
};
