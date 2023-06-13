import React, { useContext, useEffect, useState } from "react";

import styles from "@/styles/AuthenticationPage.module.css";
import {
  Button,
  Card,
  CardContent,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import TextFieldStandard from "@/components/TextField";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import UserContext from "@/components/Context";
import StoreCard from "@/components/Card/StoreCard";
import { Store } from "@/types/types";
import Link from "next/link";
import BaseCard from "@/components/Card/BaseCard";
import { BASE_API } from "@/utils/api";

const theme = createTheme({
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          alignSelf: "stretch",
          margin: "6rem",
        },
      },
    },
  },
});

export default function Product() {
  const { setState, state } = useContext(UserContext);
  const router = useRouter();

  const {
    data: storeData,
    loading: storeLoading,
    error: storeError,
  } = useFetch(BASE_API + "/store");

  const {
    data: vehiclesData,
    loading: vehiclesLoading,
    error: vehiclesError,
  } = useFetch(BASE_API + "/deliveries/vehicles");

  const [body, setBody] = useState({ totalQuantity: 0, totalValue: 0 });
  const [stores, setStores] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const currentProduct = state.products?.filter(
      (p: Product) => p.id == state.product.id
    );
    if (currentProduct.length > 0) {
      setBody((prevState) => ({
        ...prevState,
        totalQuantity: currentProduct[0].totalQuantity,
        totalValue: currentProduct[0].totalValue,
      }));
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sumQuantity = (stores: any) => {
    let sum = 0;
    for (let item in stores) {
      sum += parseInt(stores[item].quantity);
    }
    return sum;
  };

  useEffect(() => {
    if (body.totalQuantity > 0) {
      setSubmitDisabled(!(body?.totalQuantity == sumQuantity(stores)));
    }
  }, [body, stores]);

  const handleStoresQuantity = (id: string, value: string) => {
    setStores((prevState) => ({
      ...prevState,
      [id]: { ...stores[id], quantity: value },
    }));
  };

  const handleVehicleChange = (store: any, value: any) => {
    setStores((prevState) => ({
      ...prevState,
      [store.id]: { ...stores[store.id], courier: value?.id },
    }));
  };

  const handleSubmit = () => {
    const storesArray = Object.entries(stores).map(([key, value]) => ({
      ...value,
      id: key,
    }));

    // Checar se já existem produtos na lista
    if (state.products.length > 0) {
      //Checar se produto já está na lista
      if (
        state.products.filter((product: any) => product.id == state.product.id)
          .length > 0
      ) {
        const productsArray = state.products.map((product: any) => {
          // Se produto existente apenas atualizar seus campos
          if (product.id == state.product.id) {
            return {
              ...product,
              totalQuantity: body.totalQuantity,
              totalValue: body.totalValue,
              stores: storesArray,
            };
          } else {
            return product;
          }
        });
        //SetState de atualização
        setState((prevState) => ({
          ...prevState,
          products: [...productsArray],
        }));
      } else {
        //SetState de inserção na lista
        setState((prevState) => ({
          ...prevState,
          products: [
            ...prevState.products,
            { ...body, stores: storesArray, id: state.product.id },
          ],
        }));
      }
    } else {
      //SetState de criação da lista
      setState((prevState) => ({
        ...prevState,
        products: [{ ...body, stores: storesArray, id: state.product.id }],
      }));
    }
    router.back();
  };

  return (
    <main className="main-form">
      <ThemeProvider theme={theme}>
        <Link
          href={`http://localhost:3000/produto/editar/${state.product?.id}`}
        >
          <BaseCard>
            <>
              <Typography variant="h5">
                {" "}
                Produto: {state.product?.name}
              </Typography>
              <Typography variant="subtitle2">
                Unidade de medida:
                {state.product?.measuring_unit}
              </Typography>
            </>
          </BaseCard>
        </Link>
      </ThemeProvider>
      <form className="form">
        <TextFieldStandard
          label={"Qtde. Total"}
          fieldName={"totalQuantity"}
          value={body.totalQuantity}
          handleChange={handleChange}
          number
        />
        <TextFieldStandard
          label={"Valor Total"}
          fieldName={"totalValue"}
          value={body.totalValue}
          handleChange={handleChange}
          number
        />
      </form>
      {storeData ? (
        // @ts-ignore: Object is possibly 'null'
        storeData?.stores?.map((store, index) => {
          return (
            <StoreCard
              store={store}
              index={index}
              vehicles={vehiclesData?.vehicles}
              handleVehicleChange={handleVehicleChange}
              handleStoresQuantity={handleStoresQuantity}
            />
          );
        })
      ) : (
        <h1>No Stores Avaiable Right Now</h1>
      )}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={submitDisabled}
      >
        Salvar
      </Button>
    </main>
  );
}
