import BaseCard from "@/components/Card/BaseCard";
import UserContext from "@/components/Context";
import DeleteIcon from "@/components/DeleteIcon";
import EditIcon from "@/components/EditIcon";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";
import { User } from "@/types/types";
import { Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";

const Roles = {
  buyer: "Comprador",
  admin: "Administrador",
  driver: "Motorista",
  manager: "Gerente",
};

export default function Usuarios() {
  let { data } = useFetch("http://localhost:3333/v1/users");
  const { deleteItem } = useRequest();

  function removeItem<T>(arr: Array<T>, value: T): void {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    data = arr;
  }

  const handleDeleteClick = (user: User) => {
    deleteItem(
      `http://localhost:3333/v1/users/${user.id}`,
      removeItem(data?.users, user)
    );
  };

  return (
    <main className="main">
      <Box>
        {data &&
          data?.users?.map((user, index: number) => {
            return (
              <BaseCard key={index}>
                <Typography variant="h5">{user.name}</Typography>
                <Divider flexItem />
                <Box className="card-box-bottom">
                  <Box>
                    <Typography variant="h5">Telefone: {user.phone}</Typography>
                    {user.roles.map((role, index: number) => {
                      return (
                        <>
                          <span key={index}>{Roles[role.name]} </span>
                          <br />
                        </>
                      );
                    })}
                  </Box>
                  <Box className="card-box">
                    <Link
                      href={{
                        pathname: `configuration/edit-profile/${user.id}`,
                      }}
                    >
                      <EditIcon />
                    </Link>
                    <DeleteIcon handleClick={() => handleDeleteClick(user)} />
                  </Box>
                </Box>
              </BaseCard>
            );
          })}
      </Box>
      <Link href={{ pathname: "usuarios/adicionar" }}>
        <Box className="footer">
          <Button variant="contained">Criar Novo Usuário</Button>
        </Box>
      </Link>
    </main>
  );
}
