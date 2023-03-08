import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Root.module.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Root() {
  return (
    <>
      <Head>
        <div className={styles.head}></div>
        <title>Lojão Hortifruti</title>
      </Head>
      <main className={styles.main}></main>
    </>
  );
}
