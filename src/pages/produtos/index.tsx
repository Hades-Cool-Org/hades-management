import UserContext from "@/components/Context";
import {
  Button,
  Card,
  CardContent,
  createTheme,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types/types";
import Link from "next/link";
import TextFieldStandard from "@/components/TextField";
import { ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import styles from "@/styles/BuyerPage.module.css";
import ProductCard from "@/components/Card/ProductCard";

const theme = createTheme({
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          backgroundColor: "transparent",
          borderRadius: "0",
        },
      },
    },
    MuiFormLabel: {
      defaultProps: {
        sx: {
          paddingLeft: "10px",
        },
      },
    },
  },
});

const VendorPage = () => {
  const [itemsList, setItemsList] = useState<any>({});
  const { setState, state } = useContext(UserContext);
  const { vendor, products } = state;

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

  const handleLinkClick = (product: Product) => {
    setState((prevState: any) => ({
      ...prevState,
      product: product,
    }));
  };

  if (loading) return <h1>Loading</h1>;

  if (error) console.log(error);

  return (
    <main className="main">
      <Typography variant="h5">{vendor?.name}</Typography>
      <ThemeProvider theme={theme}>
        <section className={styles.cards}>
          <TextField
            variant="standard"
            label="Buscar Produtos"
            className={styles.search}
          />
          {
            // @ts-ignore: Object is possibly 'null'
            data?.products.map((product: Product, index) => {
              if (
                products.filter((p: Product) => p.id === product.id).length > 0
              ) {
                return (
                  <ProductCard
                    product={product}
                    key={index}
                    selected
                    handleLinkClick={() => handleLinkClick(product)}
                    index={index}
                  />
                );
              } else {
                return (
                  <ProductCard
                    product={product}
                    key={index}
                    handleLinkClick={() => handleLinkClick(product)}
                    index={index}
                  />
                );
              }
            })
          }
        </section>
      </ThemeProvider>
      <Link href={"/produto/adicionar"}>
        <Button variant="contained">Adicionar Produto</Button>
      </Link>
    </main>
  );
};

export default VendorPage;
