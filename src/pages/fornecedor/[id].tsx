import UserContext from "@/components/Context";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import styles from "@/styles/Root.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types/types";
import Link from "next/link";
import TextFieldStandard from "@/components/TextField";
import { ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";

const VendorPage = () => {
  const [itemsList, setItemsList] = useState<any>({});
  let context = useContext(UserContext);
  const { vendor } = context.state;

  const router = useRouter();

  const { data, loading, error } = useFetch(
    "http://localhost:3333/v1/products"
  );

  const handleItemChange = (name: string, value: string) => {
    setItemsList((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) return <h1>Loading</h1>;

  if (error) console.log(error);

  return (
    <main className={styles.main}>
      <Typography variant="h5">{vendor?.name}</Typography>
      <Link href={"/produto/adicionar"}>
        <Button variant="contained">Adicionar Produto</Button>
      </Link>
      {
        // @ts-ignore: Object is possibly 'null'
        data?.products.map((product: Product, index) => {
          return (
            <Link
              href={{ pathname: `/produto/${product.id}` }}
              onClick={() => {
                context.setState((prevState: any) => ({
                  ...prevState,
                  product: product,
                }));
              }}
            >
              <Card key={index}>
                <CardContent>
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography>Quantidade sugerida:</Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })
      }
      <IconButton
        onClick={() => {
          router.back();
        }}
      >
        <ShoppingCart fontSize="small" style={{ fill: "black" }} />
      </IconButton>
    </main>
  );
};

export default VendorPage;
