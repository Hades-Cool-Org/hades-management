import { Button, FormControl, TextField } from "@mui/material";
import styles from "@/styles/AuthenticationPage.module.css";
import Head from "next/head";
import { User } from "@/types/types";
import React, { useEffect, useContext } from "react";
import axios from "axios";
import UserContext, { UserContextProvider } from "@/components/Context";

const Authentication = () => {
  const [email, setEmail] = React.useState<string>("guilhermeX@gmail.com");
  const [password, setPassword] = React.useState<string>("guilherme");

  const context = useContext(UserContext);

  function parseJwt(token: any) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = await axios.post("http://localhost:3333/login", {
      email,
      password,
    });
    const userData = parseJwt(data.data.jwt);
    // context.state.setUser({ name: userData.name, id: userData.user_id });
    context.setUser({ name: userData.name, id: userData.user_id });
  };

  useEffect(() => {
    console.log(context);
  }, [context]);

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
