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
  const context = useContext(UserContext);
  const router = useRouter();

  const {
    data: storeData,
    loading: storeLoading,
    error: storeError,
  } = useFetch("http://localhost:3333/v1/store");

  const {
    data: vehiclesData,
    loading: vehiclesLoading,
    error: vehiclesError,
  } = useFetch("http://localhost:3333/v1/deliveries/vehicles");

  const { product } = context.state;

  const [body, setBody] = useState({ totalQuantity: 0, totalValue: 0 });
  const [stores, setStores] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

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
    setBody((prevState) => ({
      ...prevState,
      stores: storesArray,
    }));
  };

  return (
    <main className="main-form">
      <ThemeProvider theme={theme}>
        <Card>
          <CardContent>
            <Typography variant="h5">{product?.name}</Typography>
            <Typography>{product?.measuring_unit}</Typography>
          </CardContent>
        </Card>
      </ThemeProvider>
      <form className="form">
        <TextFieldStandard
          label={"Qtde. Total"}
          fieldName={"totalQuantity"}
          handleChange={handleChange}
          number
        />
        <TextFieldStandard
          label={"Valor Total"}
          fieldName={"totalValue"}
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
