import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "@/styles/Root.module.css";
import axios from "axios";
import VendorCard from "@/components/VendorCards";
import { Vendor } from "@/types/types";

const Comprador = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

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
              />
            );
          })}
      </main>
    </>
  );
};

export default Comprador;
