import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Usuarios() {
  return (
    <main className="main">
      <Button variant="contained">Adicionar Saldo</Button>
      <Link href={{ pathname: "usuarios/adicionar" }}>
        <Box className="footer">
          <Button variant="contained">Criar Novo Usuário</Button>
        </Box>
      </Link>
    </main>
  );
}
