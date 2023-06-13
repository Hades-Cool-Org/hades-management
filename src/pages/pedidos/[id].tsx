import UserContext from "@/components/Context";
import {
  Box,
  Button,
  createTheme,
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

const Order = () => {
  const [itemsList, setItemsList] = useState<any>({});
  const { setState, state } = useContext(UserContext);
  const { products } = state;

  const router = useRouter();

  const { data, loading, error } = useFetch(BASE_API + "/products");

  const {
    put,
    deleteItem,
    success,
    loadingRequest,
    error: requestError,
  } = useRequest();

  const handleLinkClick = (product: Product) => {
    setState((prevState: any) => ({
      ...prevState,
      product: product,
    }));
  };

  const handleCancelClick = () => {
    deleteItem(`${BASE_API}/orders/${state.order?.id}`, deleteCallback);
  };

  const deleteCallback = (res: any) => {
    cleanState();
    router.back();
  };

  const putOrderCallback = () => {
    router.back();
  };

  const cleanState = () => {
    setState((prevState: any) => ({
      ...prevState,
      product: null,
      order: null,
      products: [],
    }));
  };

  const cartClick = () => {
    console.log(state.products);
    const res = state.products.map((product) => {
      return product.stores.map((store) => {
        return {
          quantity: store.quantity,
          store_id: parseInt(store.id),
          product_id: product.id,
          total: product.totalValue,
        };
      });
    });
    const items = { items: res.flat() };
    const body = { user: { id: state.user.id }, ...items };
    console.log(body);
    put(`${BASE_API}/orders/${state.order.id}`, body, putOrderCallback);
  };

  if (loading) return <h1>Loading</h1>;

  if (error) console.log(error);

  return (
    <main className="main">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            Estado do pedido: {state?.order?.state}
          </Typography>
          <Link href={"/produto/adicionar"}>
            <Button variant="contained">Adicionar Novo Produto</Button>
          </Link>
        </Box>
        <Box>
          {
            // @ts-ignore: Object is possibly 'null'
            data?.products.map((product: Product, index) => {
              if (
                products.filter((p: Product) => p.id === product.id).length > 0
              ) {
                return (
                  <Box
                    key={index}
                    className="card-box-content"
                    sx={{ margin: "1rem" }}
                  >
                    <ProductCard
                      product={product}
                      selected
                      handleLinkClick={() => handleLinkClick(product)}
                      index={index}
                    />
                  </Box>
                );
              } else {
                return (
                  <Box
                    key={index}
                    className="card-box-content"
                    sx={{ margin: "1rem" }}
                  >
                    <ProductCard
                      product={product}
                      handleLinkClick={() => handleLinkClick(product)}
                      index={index}
                    />
                  </Box>
                );
              }
            })
          }
        </Box>
      </Box>

      <Box className="footer">
        <Button
          variant="contained"
          onClick={cartClick}
          disabled={loadingRequest}
        >
          Atualizar Pedido
        </Button>
        <Button
          variant="contained"
          disabled={loadingRequest}
          onClick={handleCancelClick}
          color="error"
        >
          Cancelar Pedido
        </Button>
      </Box>
    </main>
  );
};

export default Order;
