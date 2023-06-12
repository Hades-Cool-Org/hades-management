import UserContext from "@/components/Context";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
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
import BaseCard from "@/components/Card/BaseCard";
import useRequest from "@/hooks/useRequest";

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
  let { data, loading, error } = useFetch("http://localhost:3333/v1/products");

  const { deleteItem, success, loadingRequest } = useRequest();

  function removeItem<T>(arr: Array<T>, value: T): void {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    data = arr;
  }

  const handleDeleteClick = (product: Product) => {
    deleteItem(
      `http://localhost:3333/v1/products/${product.id}`,
      removeItem(data?.products, product)
    );
  };

  if (loading) return <h1>Loading</h1>;

  if (error) console.log(error);

  return (
    <main className="main">
      <Box className="main-content">
        {
          // @ts-ignore: Object is possibly 'null'
          data?.products.map((product: Product, index) => {
            return (
              <Card key={index} style={{ margin: "1rem" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://media.istockphoto.com/id/173242750/pt/foto/cacho-de-bananas.jpg?s=612x612&w=0&k=20&c=V-t2KAV-myQK5WugvB8wxfi69iP3sce0A-TYFJuL3Tg="
                  title="green iguana"
                />
                <CardContent>
                  <Box className="card-box-content">
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography>Medida: {product.measuring_unit}</Typography>
                    <Box className="card-button-box">
                      <Link
                        href={{ pathname: `/produto/editar/${product.id}` }}
                      >
                        <Button variant="contained">Editar</Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteClick(product)}
                      >
                        Remover
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })
        }
      </Box>
      <Box className="footer">
        <Link href={"/produto/adicionar"}>
          <Button variant="contained">Adicionar Produto</Button>
        </Link>
      </Box>
    </main>
  );
};

export default VendorPage;
