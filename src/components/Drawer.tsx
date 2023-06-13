import { Box, Divider, List, SwipeableDrawer } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";
import UserContext from "./Context";
import ListItem from "./ListItem";
import Logo from "./Logo";

interface DrawerProps {
  open: boolean;
  handleDrawerOpen: any;
  handleDrawerClose: any;
  handleLeaveClick: any;
}
const drawerWidth = 240;

export default function Drawer({
  open,
  handleDrawerOpen,
  handleDrawerClose,
  handleLeaveClick,
}: DrawerProps) {
  const { state } = useContext(UserContext);

  return (
    <SwipeableDrawer
      anchor="right"
      onClose={handleDrawerClose}
      onOpen={handleDrawerOpen}
      open={open}
    >
      <Box sx={{ width: drawerWidth }}>
        <List>
          <Link href={{ pathname: "/" }} onClick={handleDrawerClose}>
            <Logo />
          </Link>
          <ListItem
            itemText={"Fornecedores"}
            route="/fornecedores"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Produtos"}
            route="/produtos"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Pedidos"}
            route="/pedidos"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Lojas"}
            route="/lojas"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Veículos"}
            route="/veiculos"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Entregas"}
            route="/entregas"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Acompanhamento"}
            route="/acompanhamento"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Usuários"}
            route="/usuarios"
            handleClick={handleDrawerClose}
          />
        </List>
        <Divider />
        <List>
          <ListItem
            itemText={"Editar Perfil"}
            route={`configuration/edit-profile/${state?.user?.id}`}
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Sair"}
            route="/login"
            handleClick={handleLeaveClick}
          />
        </List>
      </Box>
    </SwipeableDrawer>
  );
}
