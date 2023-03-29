import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import styles from "@/styles/Root.module.css";
import axios from "axios";
import VendorCard from "@/components/VendorCard";
import { Vendor } from "@/types/types";
import { Button } from "@mui/material";
import Link from "next/link";
import UserContext from "@/components/Context";

const Comprador = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  let context = useContext(UserContext);
  useEffect(() => {
    async function fetchVendors() {
      const data = await axios
        .get("http://localhost:3333/v1/vendors")
        .then((response) => {
          if (response.status === 200) {
            setVendors(response.data.vendors);
            return response;
          }
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }

    fetchVendors();
  }, []);

  return (
    <>
      <Head>
        <title>Comprador</title>
      </Head>
      <main className={styles.main}>
        {vendors &&
          vendors.map((vendor, index) => {
            return (
              <VendorCard
                vendor={vendor}
                index={index}
                handleClick={context.setState}
              />
            );
          })}
        <Link href={"/fornecedor/adicionar"}>
          <Button variant="contained">Adicionar</Button>
        </Link>
      </main>
    </>
  );
};

export default Comprador;
