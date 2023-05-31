import {
  Alert,
  Button,
  Card,
  Collapse,
  IconButton,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import styles from "@/styles/AuthenticationPage.module.css";
import Head from "next/head";
import React, { useState, useContext, useEffect } from "react";
import UserContext, { UserContextProvider } from "@/components/Context";
import useRequest from "@/hooks/useRequest";
import CloseIcon from "@mui/icons-material/Close";
import Cookie from "js-cookie";

const FirstLogin = () => {
  const { put, success, loadingRequest, error } = useRequest();

  const { state } = useContext(UserContext);
  const router = useRouter();

  const [password, setPassword] = useState<string>("");
  const [confirmationPassword, setConfirmationPassword] = useState<string>("");
  const [notMatchingPasswords, setNotMatchingPasswords] =
    useState<boolean>(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    if (password === confirmationPassword) {
      const body = {
        name: state.user.name,
        email: state.user.email,
        roles: state.user.roles.map((role) => ({ name: role })),
        password,
      };
      console.log(body);
      put(`http://localhost:3333/v1/users/${state.user.id}`, body);
    } else {
      setNotMatchingPasswords(true);
    }
    event.preventDefault();
  };

  useEffect(() => {
    if (success) {
      Cookie.set("user", undefined);
      router.push("/login");
    }
  }, [router, success]);

  if (error) console.log(error);

  return (
    <>
      <Head>
        <div className={styles.head}></div>
        <title>First Login</title>
      </Head>
      <main className={styles.main}>
        <Card className={styles.formCard}>
          <form className={styles.form}>
            <TextField
              id="standard-basic"
              label="Nova Senha"
              variant="standard"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label="Confirmar Senha"
              variant="standard"
              type="password"
              onChange={(e) => {
                setConfirmationPassword(e.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loadingRequest}
            >
              Enviar
            </Button>
          </form>
          <Collapse in={notMatchingPasswords}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setNotMatchingPasswords(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Senhas não correspondem
            </Alert>
          </Collapse>
        </Card>
      </main>
    </>
  );
};
export default FirstLogin;

FirstLogin.getLayout = function PageLayout(page: JSX.Element) {
  return <UserContextProvider>{page}</UserContextProvider>;
};
