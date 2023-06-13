import { Vendor } from "@/types/types";
import { Box, Divider, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
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
        <>
          <Box>
            <Typography variant="h5">{name}</Typography>
          </Box>
          <Divider flexItem />
          <Box>
            <Typography>Local: {location}</Typography>
          </Box>
        </>
      </BaseCard>
    </Link>
  );
}
