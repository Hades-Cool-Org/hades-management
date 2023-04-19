import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import styles from "@/styles/Root.module.css";
import axios from "axios";
import VendorCard from "@/components/VendorCard";
import { Vendor } from "@/types/types";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import UserContext from "@/components/Context";
import useFetch from "@/utils/useFetch";

const Comprador = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const { data, loading, error } = useFetch("http://localhost:3333/v1/vendors");

  let context = useContext(UserContext);

  if (loading) return <h1>Loading</h1>;

  return (
    <>
      <Head>
        <title>Comprador</title>
      </Head>
      <main className={styles.main}>
        <Typography variant="h5">Fornecedores</Typography>

        {
          // @ts-ignore: Object is possibly 'null'
          data?.vendors.map((vendor, index) => {
            return (
              <VendorCard
                vendor={vendor}
                index={index}
                handleClick={context.setState}
              />
            );
          })
        }
        <Link href={"/fornecedor/adicionar"}>
          <Button variant="contained">Adicionar</Button>
        </Link>
      </main>
    </>
  );
};

export default Comprador;
