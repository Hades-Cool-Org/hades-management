import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface DriverCardProps {
  session: any;
  index: number;
  handleClick: (param: any) => any;
}

export default function DriverCard({
  session,
  index,
  handleClick,
}: DriverCardProps) {
  const { vehicle, user, id } = session;
  return (
    <Link
      href={{ pathname: `/entrega/${id}` }}
      key={index}
      onClick={() => {
        handleClick((prevState: any) => ({
          ...prevState,
          session: session,
        }));
      }}
    >
      <Card key={index}>
        <CardContent>
          <Typography variant="h5">{vehicle.name}</Typography>
          <Typography>Motorista:{user.name}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
