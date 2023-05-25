import { Box, Divider, List, SwipeableDrawer } from "@mui/material";
import React from "react";
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
  return (
    <SwipeableDrawer
      anchor="right"
      onClose={handleDrawerClose}
      onOpen={handleDrawerOpen}
      open={open}
    >
      <Box sx={{ width: drawerWidth }}>
        <List>
          <Logo />
          <ListItem
            itemText={"Carregadores"}
            route="/"
            handleClick={handleDrawerClose}
          />
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
            route="/"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Veículos"}
            route="/veiculos"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Entregas"}
            route="/"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Estoque"}
            route="/"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Acompanhamento"}
            route="/"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Ocorrências"}
            route="/"
            handleClick={handleDrawerClose}
          />
          <ListItem
            itemText={"Usuários"}
            route="/"
            handleClick={handleDrawerClose}
          />
        </List>
        <Divider />
        <List>
          <ListItem itemText={"Editar Perfil"} />
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
