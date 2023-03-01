import * as React from "react";

import styles from "@/styles/AuthenticationPage.module.css";
import { Button, TextField } from "@mui/material";

export default function EditProfile() {
  return (
    <main className={styles.main}>
      <form>
        <TextField id="standard-basic" label="Username" variant="standard" />
        <TextField
          id="standard-basic"
          label="(19)00000-0000"
          variant="standard"
        />
        <Button variant="contained" onClick={() => {}}>
          Salvar
        </Button>
      </form>
    </main>
  );
}
