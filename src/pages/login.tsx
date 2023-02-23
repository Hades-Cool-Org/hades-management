import { Button, FormControl, TextField } from "@mui/material";
import styles from "@/styles/AuthenticationPage.module.css";
import Router from "next/router";
import Head from "next/head";

const Authentication = () => {
  return (
    <>
      <Head>
        <div className={styles.head}></div>
        <title>Login</title>
      </Head>
      <main className={styles.main}>
        <form>
          <TextField id="standard-basic" label="Login" variant="standard" />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
          />
          <Button
            variant="contained"
            onClick={() => Router.push("./inicial_comprador")}
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
  return <>{page}</>;
};
