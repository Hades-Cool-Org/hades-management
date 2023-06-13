import { Vendor } from "@/types/types";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import BaseCard from "./BaseCard";

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
      <BaseCard key={index}>
        <CardContent>
          <Box>
            <Typography variant="h5">{name}</Typography>
          </Box>
          <Divider flexItem />
          <Box className="card-box-bottom">
            <Typography>Local: {location}</Typography>
          </Box>
        </CardContent>
      </BaseCard>
    </Link>
  );
}
