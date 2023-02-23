import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@/components/ListItem';

import styles from '@/styles/AuthenticationPage.module.css'

export default function ConfigurationPage() {
  

  return (
    <main className={styles.main}>
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
    >
      <ListItem itemText='Editar Perfil'/>
      <ListItem itemText='Carregadores'/>
      <ListItem itemText='Ajuda'/>
      <ListItem itemText='Sair'/>
    </List>
    </main>
  );
}