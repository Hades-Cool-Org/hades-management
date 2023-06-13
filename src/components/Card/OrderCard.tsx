import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import BaseCard from "./BaseCard";

interface OrderCardProps {
  id: string;
  state: string;
  userName: string;
  vendorName: string;
  handleClick: any;
  order: any;
}

export default function OrderCard({
  id,
  state,
  userName,
  vendorName,
  handleClick,
  order,
}: OrderCardProps) {
  return (
    <Link
      href={{ pathname: `/pedidos/${id}` }}
      onClick={() => handleClick(order)}
    >
      <BaseCard>
        <Box className="card-box">
          <Typography variant="h5">Fornecedor: {vendorName}</Typography>
          <Divider flexItem />
          <Typography>Estado: {state}</Typography>
          <Typography>Criador: {userName}</Typography>
        </Box>
      </BaseCard>
    </Link>
  );
}
