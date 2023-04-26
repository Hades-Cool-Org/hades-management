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
      href={{ pathname: `/fornecedor/${vendor.id}` }}
      onClick={() => {
        handleClick((prevState: any) => ({
          ...prevState,
          vendor: vendor,
        }));
      }}
    >
      <Card key={index}>
        <CardContent>
          <Typography variant="h5">{name}</Typography>
          <Typography>{location}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
