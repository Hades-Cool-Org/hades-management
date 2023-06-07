import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import BaseCard from "./BaseCard";

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
      <BaseCard>
        <>
          <Typography variant="h5">Fornecedor: {vendorName}</Typography>
          <Typography>{state}</Typography>
          <Typography>{userName}</Typography>
        </>
      </BaseCard>
    </Link>
  );
}
