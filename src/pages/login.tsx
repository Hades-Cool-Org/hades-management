import { Button, FormControl, TextField } from "@mui/material";
import styles from "@/styles/AuthenticationPage.module.css";
import Head from "next/head";
import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext, { UserContextProvider } from "@/components/Context";
import parseJwt from "@/utils/parseJwt";
// @ts-ignore
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

const Authentication = () => {
  const [email, setEmail] = useState<string>("guilhermeX@gmail.com");
  const [password, setPassword] = useState<string>("guilherme");

  const userContext = useContext(UserContext);

  const router = useRouter();

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const data = await axios
      .post("http://localhost:3333/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          cookieCutter.set("loggedIn", true);
          userContext.setUser?.(parseJwt(response.data.jwt));
          router.push("/");
          return response;
        }
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
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
