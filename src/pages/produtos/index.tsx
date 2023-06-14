import UserContext from "@/components/Context";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  createTheme,
  Divider,
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
import DeleteIcon from "@/components/DeleteIcon";
import EditIcon from "@/components/EditIcon";
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
    MuiFormLabel: {
      defaultProps: {
        sx: {
          paddingLeft: "10px",
        },
      },
    },
  },
});

const Products = () => {
  let { data, loading, error } = useFetch(BASE_API + "/products");

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
      `${BASE_API}/products/${product.id}`,
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
                <CardContent>
                  <Box className="card-box-content">
                    <Typography variant="h5">{product.name}</Typography>
                    <Divider flexItem />
                  </Box>
                  <Box className="card-box-bottom">
                    <Typography>Medida: {product.measuring_unit}</Typography>
                    <Box>
                      <Link
                        href={{ pathname: `/produto/editar/${product.id}` }}
                      >
                        <EditIcon />
                      </Link>
                      <DeleteIcon
                        handleClick={() => handleDeleteClick(product)}
                      />
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

export default Products;
