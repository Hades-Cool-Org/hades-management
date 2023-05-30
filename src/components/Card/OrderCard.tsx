import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface OrderCardProps {
  id: string;
  state: string;
  userName: string;
  vendorName: string;
}

export default function OrderCard({
  id,
  state,
  userName,
  vendorName,
}: OrderCardProps) {
  return (
    <Link href={{ pathname: `/pedidos/${id}` }}>
      <Card>
        <CardContent>
          <Typography>{id}</Typography>
          <Typography>{state}</Typography>
          <Typography>{userName}</Typography>
          <Typography>{vendorName}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
