import { Button, FormControl, TextField } from "@mui/material";
import styles from "@/styles/AuthenticationPage.module.css";
import Head from "next/head";
import React, { useState, useContext } from "react";
import UserContext, { UserContextProvider } from "@/components/Context";

import { useRouter } from "next/router";
import { login } from "../utils/apis";

const Authentication = () => {
  const [email, setEmail] = useState<string>("guilhermeX@gmail.com");
  const [password, setPassword] = useState<string>("guilherme");
  const router = useRouter();

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    const body = { email, password };
    login(body, router.push);
    event.preventDefault();
  };

  return (
    <>
      <Head>
        <div className={styles.head}></div>
        <title>Login</title>
      </Head>
      <main className={styles.main}>
        <form>
          <TextField
            id="standard-basic"
            label="Login"
            variant="standard"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </main>
    </>
  );
};
export default Authentication;

Authentication.getLayout = function PageLayout(page: JSX.Element) {
  return <UserContextProvider>{page}</UserContextProvider>;
};
