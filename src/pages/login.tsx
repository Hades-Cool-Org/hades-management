import { Button, FormControl, TextField } from "@mui/material";
import styles from "@/styles/AuthenticationPage.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { User } from "@/types";
import React from "react";
import Context from "@/components/Context";

const Authentication = () => {
  const [email, setEmail] = React.useState("");
  const router = useRouter();
  const context = React.useContext(Context);

  const handleChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const checkUser: any = () => {
    switch (email) {
      case "comprador":
        router.push("/comprador");
        break;
    }
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
            onChange={handleChangeEmail}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
          />
          <Button variant="contained" onClick={checkUser}>
            Submit
          </Button>
        </form>
      </main>
    </>
  );
};
export default Authentication;

Authentication.getLayout = function PageLayout(page: JSX.Element) {
  return <>{page}</>;
};
