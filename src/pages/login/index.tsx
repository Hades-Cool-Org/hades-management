import { Button, Card, TextField } from "@mui/material";
import { useRouter } from "next/router";
import styles from "@/styles/AuthenticationPage.module.css";
import Head from "next/head";
import React, { useState, useContext, useEffect, useCallback } from "react";
import UserContext, {
  AppContextState,
  UserContextProvider,
} from "@/components/Context";
import useRequest from "@/hooks/useRequest";
import SEO from "@/components/Head";
import Cookie from "js-cookie";
import Logo from "@/components/Logo";

const Authentication = () => {
  const { login, success, loadingRequest, error } = useRequest();

  const { state, setState } = useContext(UserContext);

  const [email, setEmail] = useState<string>("guilhermeX@gmail.com");
  const [password, setPassword] = useState<string>("guilherme");
  const router = useRouter();

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    const body = { email, password };
    login(body, postLoginCallback);
    event.preventDefault();
  };

  const postLoginCallback = useCallback(
    (res: any, token: any) => {
      console.log(token);
      setState((prevState: AppContextState) => ({
        ...prevState,
        user: {
          email: email,
          name: token.name,
          id: token.user_id,
          roles: token.roles,
        },
      }));
      if (res.first_login) {
        router.push("login/first");
      } else {
        router.push("/");
      }
    },
    [success]
  );

  useEffect(() => {
    return () => {
      Cookie.set("state", JSON.stringify(state));
    };
  }, []);

  if (error) console.log(error);

  return (
    <>
      <SEO pageTitle={"Login"} pageDescription={"Tela de login"} />
      <main className={styles.main}>
        <Logo />
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
