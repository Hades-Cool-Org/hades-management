import { Button, FormControl, TextField } from "@mui/material";
import { useRouter } from "next/router";
import styles from "@/styles/AuthenticationPage.module.css";
import Head from "next/head";
import React, { useState, useContext, useEffect } from "react";
import UserContext, { UserContextProvider } from "@/components/Context";
import useRequest from "@/hooks/useRequest";

const Authentication = () => {
  const { login, tokenData, success, loadingRequest, error } = useRequest();

  const [email, setEmail] = useState<string>("guilhermeX@gmail.com");
  const [password, setPassword] = useState<string>("guilherme");
  const router = useRouter();

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    const body = { email, password };
    login(body);
    event.preventDefault();
  };

  useEffect(() => {
    if (success) {
      console.log(tokenData);
      switch (tokenData.roles[0]) {
        case "admin":
          router.push("/gerente");
          break;
        case "fornecedor":
          router.push("/fornecedor");
          break;
        case "entregador":
          router.push("/entregador");
        case "precificador":
          router.push("/precificador");
        default:
        case "comprador":
          router.push("/comprador");
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
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loadingRequest}
          >
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
