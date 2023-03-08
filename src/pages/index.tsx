import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Root.module.css";
import React from "react";
import Context from "@/components/Context";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Root() {
  const value = React.useContext(Context);
  const router = useRouter();

  React.useEffect(() => {
    if (!value.state.user) {
      router.push("/login");
    }
  }, []);

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
