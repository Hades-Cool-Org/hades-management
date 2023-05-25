import Head from "next/head";
import styles from "@/styles/Root.module.css";

import useFetch from "@/hooks/useFetch";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useRequest from "@/hooks/useRequest";
import UserContext from "@/components/Context";
import { useRouter } from "next/router";
import Link from "next/link";

const Veiculos = () => {
  const [vehicleId, setVehicleId] = useState<string>("");

  const { data, loading, error } = useFetch(
    "http://localhost:3333/v1/deliveries/vehicles"
  );

  const { state, setState } = useContext(UserContext);

  const { post, success } = useRequest();

  const router = useRouter();

  const handleVehicleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setVehicleId(newValue);
  };

  const handleClick = () => {
    const body = { user: { id: state?.user?.id }, vehicle: { id: vehicleId } };
    post(
      "http://localhost:3333/v1/deliveries/sessions",
      body,
      postSessionCallback
    );
  };

  const postSessionCallback = (res: any) => {
    setState((prevState) => ({
      ...prevState,
      session: res,
    }));
    router.push(`/motorista/session/${res.id}`);
  };

  if (loading) return <h1>Loading</h1>;
  if (error) console.log(error);
  return (
    <>
      <Head>
        <title>Veiculos</title>
      </Head>
      {data && (
        <main className={styles.main}>
          <Typography>{state?.user?.name}</Typography>

          <ToggleButtonGroup
            color="primary"
            exclusive
            aria-label="Platform"
            value={vehicleId}
            onChange={handleVehicleChange}
            orientation="vertical"
          >
            {
              // @ts-ignore: Object is possibly 'null'
              data?.vehicles?.map((vehicle: Product, index: number) => {
                return (
                  <ToggleButton value={vehicle.id} key={index}>
                    {
                      <>
                        <h1>{vehicle.name}</h1>
                        <h2>{vehicle.type}</h2>
                      </>
                    }
                  </ToggleButton>
                );
              })
            }
          </ToggleButtonGroup>
          <Link href={"veiculos/adicionar"}>
            <Button variant="contained">Adicionar Veiculo</Button>
          </Link>
          <Button onClick={handleClick} variant="contained">
            Iniciar Sessão
          </Button>
        </main>
      )}
    </>
  );
};

export function getServerSideProps({ req, res }) {
  return {
    props: { user: req.cookies.user },
  };
}

export default Veiculos;
