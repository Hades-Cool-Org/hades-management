import { Vendor } from "@/types/types";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface VendorCardProps {
  vendor: Vendor;
  index: number;
  handleClick: (param: any) => any;
}

export default function VendorCard({
  vendor,
  index,
  handleClick,
}: VendorCardProps) {
  const { name, location } = vendor;
  return (
    <Link
      href={{ pathname: `/fornecedores` }}
      onClick={() => {
        handleClick(vendor);
      }}
    >
      <Card key={index}>
        <CardContent>
          <Typography variant="h5">{name}</Typography>
          <Typography>Local: {location}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
