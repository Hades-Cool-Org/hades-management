import { Button, Card, TextField } from "@mui/material";
import { useRouter } from "next/router";
import styles from "@/styles/AuthenticationPage.module.css";
import Head from "next/head";
import React, { useState, useContext, useEffect } from "react";
import UserContext, {
  AppContextState,
  UserContextProvider,
} from "@/components/Context";
import useRequest from "@/hooks/useRequest";

const Authentication = () => {
  const { login, tokenData, success, loadingRequest, error } = useRequest();

  const { setState } = useContext(UserContext);

  const [email, setEmail] = useState<string>("guilhermeX@gmail.com");
  const [password, setPassword] = useState<string>("guilherme");
  const router = useRouter();

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    const body = { email, password };
    console.log(body);
    login(body);
    event.preventDefault();
  };

  useEffect(() => {
    if (success) {
      console.log(tokenData);
      setState((prevState: AppContextState) => ({
        ...prevState,
        user: {
          email: email,
          name: tokenData.name,
          id: tokenData.user_id,
          roles: tokenData.roles,
        },
      }));
      if (true) {
        router.push("login/first");
      } else {
        router.push("/");
      }
    }
  }, [success]);

  if (error) console.log(error);

  return (
    <>
      <Head>
        <div className={styles.head}></div>
        <title>Login</title>
      </Head>
      <main className={styles.main}>
        <Card className={styles.formCard}>
          <form className={styles.form}>
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
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loadingRequest}
            >
              Submit
            </Button>
          </form>
        </Card>
      </main>
    </>
  );
};
export default Authentication;

Authentication.getLayout = function PageLayout(page: JSX.Element) {
  return <UserContextProvider>{page}</UserContextProvider>;
};
