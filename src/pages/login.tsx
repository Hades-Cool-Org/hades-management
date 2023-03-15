import { Button, FormControl, TextField } from "@mui/material";
import styles from "@/styles/AuthenticationPage.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { User } from "@/types";
import React from "react";
import Context from "@/components/Context";
import axios from "axios";

const Authentication = () => {
  const [email, setEmail] = React.useState<string>("guilhermeX@gmail.com");
  const [password, setPassword] = React.useState<string>("guilherme");

  const router = useRouter();
  const context = React.useContext(Context);

  const handleSubmit = async (event: any) => {
    console.log(email, password);
    event.preventDefault();
    const data = await axios.post("api/login", {email, password});
    
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
  return <>{page}</>;
};
