import UserContext from "@/components/Context";
import {
  Button,
  Card,
  CardContent,
  createTheme,
  IconButton,
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
import useRequest from "@/hooks/useRequest";
import { BASE_API } from "@/utils/api";

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
  },
});

const VendorPage = () => {
  const [itemsList, setItemsList] = useState<any>({});
  const { setState, state } = useContext(UserContext);
  const { vendor, products } = state;

  const router = useRouter();

  const { data, loading, error } = useFetch(BASE_API + "/products");

  const {
    post,
    put,
    success,
    loadingRequest,
    error: requestError,
  } = useRequest();

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

  const cartClick = () => {};

  if (loading) return <h1>Loading</h1>;

  if (error) console.log(error);

  return (
    <main className="main">
      <Typography variant="h5">{vendor?.name}</Typography>
      <Link href={"/produto/adicionar"}>
        <Button variant="contained">Adicionar Produto</Button>
      </Link>
      <section className={styles.cards}>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </section>
      <IconButton onClick={cartClick} disabled={loadingRequest}>
        <ShoppingCart fontSize="small" style={{ fill: "black" }} />
      </IconButton>
    </main>
  );
};

export default VendorPage;
