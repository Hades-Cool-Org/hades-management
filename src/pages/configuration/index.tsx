import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@/components/ListItem";
import Context from "@/components/Context";
import styles from "@/styles/AuthenticationPage.module.css";
import Link from "next/link";
import Header from "@/components/Header";
import UserContext from "@/components/Context";
// @ts-ignore
import cookieCutter from "cookie-cutter";

export default function Configuration() {

  const userData = JSON.parse(cookieCutter.get("user"))

  return (
    <main className={styles.main}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav">
        <Link href={`/configuration/edit-profile/${userData.user_id}`}>
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
