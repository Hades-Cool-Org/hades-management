import React, { useContext } from "react";
import styles from "@/styles/Root.module.css";
import UserContext from "@/components/Context";

export default function Entrega() {
  const context = useContext(UserContext);
  const { session } = context.state;
  console.log(session);

  return (
    <main className={styles.main}>
      <span>Conferir os produtos do caminhão</span>
      <span>
        {session.vehicle.name} <br />
        {session.vehicle.type}
      </span>
      <h1>Listar Produtos</h1>
    </main>
  );
}
