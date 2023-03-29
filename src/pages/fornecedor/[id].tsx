import UserContext from "@/components/Context";
import { Button, Typography } from "@mui/material";
import styles from "@/styles/Root.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types/types";
import Link from "next/link";

const VendorPage = () => {
  const [products, setProducts] = useState([]);
  let context = useContext(UserContext);
  const { vendor } = context.state;

  useEffect(() => {
    async function fetchProducts() {
      const data = await axios
        .get("http://localhost:3333/v1/products")
        .then((response) => {
          if (response.status === 200) {
            setProducts(response.data.products);
            return response;
          }
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }

    fetchProducts();
  }, []);

  return (
    <main className={styles.main}>
      <Typography variant="h5">{vendor.name}</Typography>
      <Link href={'/produto/adicionar'}>
        <Button variant="contained">Adicionar Produto</Button>
      </Link>
      {products &&
        products.map((product: Product, index) => {
          return <p>{product.name}</p>;
        })}
    </main>
  );
};

export default VendorPage;
