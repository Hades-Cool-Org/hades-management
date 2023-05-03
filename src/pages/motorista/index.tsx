import Head from "next/head";
import styles from "@/styles/Root.module.css";

import useFetch from "@/hooks/useFetch";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useRequest from "@/hooks/useRequest";

const Motorista = ({ user }) => {
  const [vehicleId, setVehicleId] = useState<string>("");

  const { data, loading, error } = useFetch(
    "http://localhost:3333/v1/deliveries/vehicles"
  );

  const request = useRequest();

  const userData = JSON.parse(user);

  const handleVehicleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setVehicleId(newValue);
  };

  const handleClick = () => {
    const body = { user: { id: userData.user_id }, vehicle: { id: vehicleId } };
    request.post("http://localhost:3333/v1/deliveries/sessions", body);
  };

  useEffect(() => {
    if (request.success) {
      console.log("success");
    }
  }, [request.success]);

  if (loading) return <h1>Loading</h1>;
  if (error) console.log(error);
  return (
    <>
      <Head>
        <title>Motorista</title>
      </Head>
      {data && (
        <main className={styles.main}>
          <Typography>{userData.name}</Typography>

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
              data?.vehicles.map((vehicle: Product, index) => {
                return (
                  <ToggleButton value={vehicle.id}>
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
          <Button onClick={handleClick}>Iniciar Sessão</Button>
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

export default Motorista;
